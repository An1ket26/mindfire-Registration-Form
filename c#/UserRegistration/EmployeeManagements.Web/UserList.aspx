﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserList.aspx.cs" Inherits="EmployeeManagements.Web.UserList" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User List</title>
    <link rel="stylesheet" href="StyleSheets/UserList.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
</head>
<body>
   
    <form id="form1" runat="server"> 
        <asp:Button runat="server" Text="LogOut" ID="LogutBtn" OnClick="Logout" CssClass="logout-btn"/>
        <div>
            <h1 class="heading"><u>User List</u></h1>
           
            <asp:GridView 
                ID="GridView1" 
                runat="server"  
                DataKeyNames="Id" 
                AutoGenerateColumns="false" 
                EmptyDataText="No records has been added."
                CssClass="UserList-Table" 
                HeaderStyle-CssClass="UserList-Header"
                RowStyle-CssClass="UserList-Rows"
                OnRowEditing="OnRowEditing"
                OnRowCancelingEdit="OnRowCancelingEdit" 
                OnRowDeleting="OnRowDeleting" 
                OnRowDataBound="OnRowDataBound"
                >
                <Columns>
                    <asp:TemplateField HeaderText="Image" ItemStyle-CssClass="width-70" >
                        <ItemTemplate>
                            <asp:Image ImageUrl='<%# Eval("ImageUrl") %>' runat="server" ID="UserImageId" ClientIDMode="Static"/>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="FirstName" ItemStyle-CssClass="width-150">
                        <ItemTemplate>
                            <asp:Label ID="lblFirstname" runat="server" Text='<%# Eval("FirstName") %>'></asp:Label>
                        </ItemTemplate> 
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="LastName" ItemStyle-CssClass="width-150">
                        <ItemTemplate>
                            <asp:Label ID="lblLastName" runat="server" Text='<%# Eval("LastName") %>'></asp:Label>
                        </ItemTemplate> 
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Email" ItemStyle-CssClass="width-250">
                        <ItemTemplate>
                            <asp:Label ID="lblEmail" runat="server" Text='<%# Eval("Email") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Dob" ItemStyle-CssClass="width-150">
                        <ItemTemplate>
                            <asp:Label ID="lblDob" runat="server" Text='<%# Eval("Dob") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Gender" ItemStyle-CssClass="width-70">
                        <ItemTemplate>
                            <asp:Label ID="lblGender" runat="server" Text='<%# Eval("Gender") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Roles" ItemStyle-CssClass="width-250" >
                        <ItemTemplate>
                            <asp:Label ID="lblRoles" runat="server" Text='<%# Eval("Roles") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Configure" ItemStyle-CssClass="width-150">
                        <ItemTemplate>
                            <asp:ImageButton ImageUrl="Images/edit.png" CommandName="Edit" runat="server" CssClass="EditUser-btnImage" ToolTip="Edit" />
                            <asp:ImageButton ImageUrl="Images/delete.png" CommandName="Delete" runat="server" CssClass="DeleteUser-btnImage" ToolTip="Delete"/>
                           <%-- <asp:Button ID="AddUserBtn" runat="server" Text="Edit" CommandName="Edit" CssClass="EditUser-btn" />
                            <asp:Button ID="Button1" runat="server" Text="Delete" CommandName="Delete" CssClass="DeleteUser-btn"/>--%>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
            <br/>
            <asp:Button ID="AddUserBtn" runat="server" Text="Add User" OnClick="AddUser" CssClass="AddUser-btn"/>
        </div>
    </form>
    <div id="myModal" class="modal">
            <div class="modal-Image">
                <img src="Images/cancel.png" />
            </div>
       
            <div class="modal-content">
                <h3 id="errorMessage">Invalid Email or Password</h3>
            </div>
            <div class="modal-close">
                <button id="CloseModal">Close</button>
            </div>
        </div>
    <script src="Scripts/UserList.js"></script>
</body>
</html>


