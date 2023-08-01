﻿$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: 'UserDetails.aspx/FetchCountry',
        data: '{message: "HAI" }',
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            LoadCountry(data.d, "#permanentCountry");
            LoadCountry(data.d, "#presentCountry");
        },
        failure: function (response) {
            alert(response.d);
        }
    });
    var update = false;
    var userId;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('UserId') !== null)
    {
        update = true;
        
        userId = urlParams.get('UserId');
        $.ajax({
            type: "POST",
            url: 'UserDetails.aspx/FetchUser',
            data: JSON.stringify({ userId: userId }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data.d);
                populateData(data.d);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
        $("#submitBtn").val("Update");
    }
    
    function populateData(data)
    {
        $("input").each(function () {
            if ($(this).attr("filldata")) {
                var key = $(this).attr("filldata")
                if ($(this).attr("name") === "subscribe") {
                    this.checked = data[key] === "YES";
                }
                else {
                    $(this).val(data[key]);
                }
            }
        })
        $("select").each(function (){
            if ($(this).attr("filldata")) {
                var key = $(this).attr("filldata");
                //console.log(data[key]);
                if ($(this).attr("state-load")) {
                    //console.log($(this).attr("id"));
                    
                    fetchState($($(this).attr("parent-id")).val(), data[key], `#${$(this).attr("id")}`);
                } else {
                    $(this).val(data[key]);
                }
            }
        })
        $("#RoleListdiv input").each(function () {
            UserRole = data.UserRoles.split(",");
            if (UserRole.includes($(this).val())) {
                this.checked = true;
            }
            
        })
    }


    //api
    $("#permanentCountry").on("change", function () {
        
        var val = $(this).val();
        $.ajax({
            type: "POST",
            url: 'UserDetails.aspx/FetchState',
            data: JSON.stringify({country:val}),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                LoadCountry(data.d, "#permanentState");
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    });
    $("#presentCountry").on("change", function () {
        var val = $(this).val();
        console.log(val);
        $.ajax({
            type: "POST",
            url: 'UserDetails.aspx/FetchState',
            data: JSON.stringify({ country: val }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                LoadCountry(data.d, "#presentState");
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    });
    async function fetchState(val, state, stateId)
    {
        $.ajax({
            type: "POST",
            url: 'UserDetails.aspx/FetchState',
            data: JSON.stringify({ country: val }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                LoadState(data.d, stateId,state);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
        
        return true;
    }
    
    $.ajax({
        type: "POST",
        url: 'UserDetails.aspx/FetchCountry',
        data: '{message: "HAI" }',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            LoadCountry(data.d, "#permanentCountry");
            LoadCountry(data.d, "#presentCountry");
        },
        failure: function (response) {
            alert(response.d);
        }
    });

    function LoadCountry(apiData,selectId)
    {
        
        $(selectId)
            .children()
            .remove()
            .end()
            .append(
                '<option value="none" selected disabled hidden>Select an Option</option>'
            );
        if (apiData.length === 0) {
            $(selectId).append(
                createOption(
                    $($(selectId).attr("parent-id")).val(),
                    $($(selectId).attr("parent-id")).val()
                )
            );
        } else {
            for (const data of apiData) {
                $(selectId).append(createOption(data.trim(), data.trim()));
            }
        }
    }
    function LoadState(apiData, selectId,state) {

        $(selectId)
            .children()
            .remove()
            .end()
            .append(
                '<option value="none" selected disabled hidden>Select an Option</option>'
            );
        if (apiData.length === 0) {
            $(selectId).append(
                createOption(
                    $($(selectId).attr("parent-id")).val(),
                    $($(selectId).attr("parent-id")).val()
                )
            );
        } else {
            for (const data of apiData) {
                $(selectId).append(createOption(data.trim(), data.trim()));
            }
        }
        $(selectId).val(state);
    }

    $("#roleDisplay").click(function (event) {
        event.preventDefault();
;        $("#RoleListdiv").show();
    })



    //validation
    function checkEmpty(value) {
        if (value.length > 0) {
            return true;
        }
        return false;
    }
    function checkEmail(value) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.length > 0 && regex.test(value) === true) {
            return true;
        }
        return false;
    }
    function checkDob(value) {
        let todayDate = new Date();
        let inputDate = new Date(value);
        const differenceYear =
            (todayDate - inputDate) / (1000 * 60 * 60 * 24 * 365);
        if (differenceYear < 18) {
            return false;
        }
        return true;
    }
    function checkSelectNotNone(value) {
        if (value === null) {
            return false;
        }
        return true;
    }
    function inputValidate(inputTag) {
        if (!inputTag.attr("validation-data")) {
            return false;
        }
        let isError = false;
        const validationTypes = inputTag.attr("validation-data").split(" ");
        for (type of validationTypes) {
            let fl = true;
            if (type === "notEmpty") {
                fl = checkEmpty(inputTag.val().trim());
                $(inputTag.attr("error-id"))
                    .text("*required")
                    .css("display", fl ? "none" : "block");

                if (!fl) {
                    isError = true;
                    break;
                }
            }
            if (type === "email") {
                fl = checkEmail(inputTag.val().trim());
                $(inputTag.attr("error-id"))
                    .text("*enter valid email")
                    .css("display", fl ? "none" : "block");
                if (!fl) {
                    isError = true;
                    break;
                }
            }
            if (type === "dob>18") {
                fl = checkDob(inputTag.val() === "" ? new Date() : inputTag.val());
                $(inputTag.attr("error-id"))
                    .text("*must be 18 years old")
                    .css("display", fl ? "none" : "block");
                if (!fl) {
                    isError = true;
                    break;
                }
            }
        }
        return isError;
    }

    function selectValidate(selectTag) {
        if (!selectTag.attr("validation-data")) {
            return false;
        }
        let isError = false;
        const validationTypes = selectTag.attr("validation-data").split(" ");
        for (type of validationTypes) {
            let fl = true;
            if (type === "parentCheck") {
                fl = checkSelectNotNone($(selectTag.attr("parent-id")).val());
                $(selectTag.attr("error-id"))
                    .text(`please select ${selectTag.attr("id").includes("State") ? "country" : "state"} first`)
                    .css("display", fl ? "none" : "block");
                if (!fl) {
                    isError = true;
                    break;
                }
            }
            if (type === "notEmpty") {
                fl = checkSelectNotNone(selectTag.val());
                $(selectTag.attr("error-id"))
                    .text("*required")
                    .css("display", fl ? "none" : "block");
                if (!fl) {
                    isError = true;
                    break;
                }
            }
        }
        return isError;
    }

    $("input").on("input change", function () {
        inputValidate($(this));
    });

    $("select").on("click change", function () {
        selectValidate($(this));
    });

    //copy from present to permanent

    $("#copyFromPresentToPermanentCheckbox").click(async function () {
        let isError = false;
        $("#presentAddress input").each(function () {
            isError = isError | inputValidate($(this));
        });
        $("#presentAddress select").each(function () {
            isError = isError | selectValidate($(this));
        });
        if (isError) {
            $(this).prop("checked", false);
            return;
        }
        if (this.checked) {
            $("#permanentAddress input").each(function () {
                if ($(this).attr("copy-val-id"))
                    $(this).val($($(this).attr("copy-val-id")).val());
                inputValidate($(this));
            });
            $("#permanentAddress select").each(async function () {
                if ($(this).attr("load-state-first")) {
                    const res = await fetchState($("#permanentCountry").val(), $($(this).attr("copy-val-id")).val(), `#${$(this).attr("id")}`);
                  
                }  else {
                    if ($(this).attr("copy-val-id")) {
                        $(this).val($($(this).attr("copy-val-id")).val());
                        selectValidate($(this));
                    }
                }
            });
        } else {
            $("#permanentAddress input").val("");
            $("#permanentAddress select").html();
            var newOption = $("<option>");
            newOption.val("none");
            newOption.text("Select an Option");
            newOption.attr("selected", true);
            newOption.attr("disabled", true);
            newOption.attr("hidden", true);
            $("#permanentAddress select").append(newOption);
        }
    });
    function createOption(value, text) {
        var newOption = $("<option>");
        newOption.val(value);
        newOption.text(text);
        return newOption;
    }

    //HOBBY

    const initialHobbyOptions = [];
    $("#" + $("#hobbyInput").attr("list") + " option").each(function () {
        initialHobbyOptions.push($(this).val());
    });
    $("#hobbyInput").on("input", function () {
        const lastIndexofComma = $(this).val().lastIndexOf(",");
        let newHobbyOptions = "";
        if (lastIndexofComma !== -1) {
            newHobbyOptions = $(this).val().substr(0, lastIndexofComma) + ",";
        }
        const usedHobbyOptions = newHobbyOptions
            .split(",")
            .map((value) => value.trim());
        if ($(this)[0].list && initialHobbyOptions.length > 0) {
            $("#" + $("#hobbyInput").attr("list")).html("");

            for (const alloption of initialHobbyOptions) {
                if (usedHobbyOptions.indexOf(alloption) < 0) {
                    $("#" + $("#hobbyInput").attr("list")).append(
                        `<option>${newHobbyOptions + alloption}</option>`
                    );
                }
            }
        }
    });

    // image

    $("#profileImageInput").change(function (e) {
        const imgSrc = URL.createObjectURL(e.target.files[0]);
        $("#profileImageDisplay").attr("src", imgSrc);
    })

    //submit action

    const displayResultDiv = (formData) => {
        $("#container input").each(function () {
            if ($(this).attr("displayid")) {
                
                if (this.id === "subscribeCheckbox") {
                    var x =$("#" + $(this).attr("displayid")).attr("objectName")
                    formData[x] = $(
                        "#subscribeCheckbox"
                    ).is(":checked")
                        ? "YES"
                        : "NO";
                } else {
                    var x = $("#" + $(this).attr("displayid")).attr("objectName");
                    formData[x] = $(this).val() === "" ? "NA" : $(this).val();
                }
            }
        });
        $("#container select").each(function () {
            if ($(this).attr("displayid")) {
                var x = $("#" + $(this).attr("displayid")).attr("objectName")
                formData[x] = $(this).val() === null ? "NA" : $(this).val();
            }
        });
        Roles = "";
        $("#RoleListdiv input").each(function () {
            if (this.checked) {
                Roles+=this.value+","; 
            }
        })
        formData.UserRoles = Roles;

    };

    $("#submitBtn").click(function (event) {
        event.preventDefault();
        let isError = false;
        $("#container input").each(function () {
            isError = isError | inputValidate($(this));
        });
        $("#container select").each(function () {
            isError = isError | selectValidate($(this));
        });
        if (isError) {
            return false;
        }
        const formData = {};
        displayResultDiv(formData);
        //formData.imageSrc = $("#profileImageDisplay").attr("src");
        console.log(formData);
        if (update) {
            formData.userId = userId;
            sendToUpdate(formData)
        } else {
            sendToServer(formData);
        }
        
        window.location.href = "userlist";
    });


    async function sendToServer(formData)
    {
        $.ajax({
            type: "POST",
            url: 'UserDetails.aspx/StoreData',
            data: JSON.stringify({ user: formData }),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                console.log(data.d);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }
    async function sendToUpdate(formData) {
        $.ajax({
            type: "POST",
            url: 'UserDetails.aspx/UpdateData',
            data: JSON.stringify({ item: formData }),
            contentType: "application/json; charset=utf-8",
            async:false,
            success: function (data) {
                console.log(data.d);
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

    $("#cancelBtn").on("click", function (e) {
        e.preventDefault();
        window.location.href = "userlist";
    });

});



