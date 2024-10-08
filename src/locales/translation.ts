import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // PUBLIC LAYOUT
            "PublicLayout_ActionText": "Start to create your collections... for free",
            "PublicLayout_RegisterButton": "Register",
            "PublicLayout_LoginButton": "Log In",
            "ThemeLight_Text": "Light",
            "ThemeDark_Text": "Dark",

            // LOGIN
            "Login_Email": "Email",
            "Login_EmailRequired": "The email is required",
            "Login_Password": "Password",
            "Login_PasswordPlaceholder": "Type your password",
            "Login_PasswordRequired": "The password is required",

            "Login_SignIn": "Sign In",
            "Login_Message": "You don't have an account?",

            // REGISTER
            "Register_SignUp": "Sign  Up",
            "Register_CompleteTheForm": "Complete the form to ",
            "Register_CreateYourAccount": "create your account",
            "Register_Name": "Name",
            "Register_NameRequired": "The name is required",
            "Register_Email": "Email",
            "Register_EmailRequired": "The email is required",
            "Register_EmailInvalid": "Invalid email",
            "Register_Password": "Password",
            "Register_PasswordRequired": "The password is required",
            "Register_PasswordLength": "The password must have at least 6 characters long",
            "Register_PasswordPlaceholder": "Register password",
            "Register_ConfirmPassword": "Confirm password",
            "Register_ConfirmPasswordRequired": "Confirm your password is required",
            "Register_PasswordUnmatch": "The passwords do not match",

            "Register_Message": "Do you already have an account? ",

            // NAV MENU
            "NavMenu_Greeting": "Hello, {{name}}",
            "NavMenu_Profile": "Profile",
            "NavMenu_AdminPanel": "Admin Panel",
            "NavMenu_Logout": "Log Out",

            // HOME
            "Home_Title1": "Explore the stories behind ",
            "Home_Title2": "each collection.",
            "Search_Placeholder": "Search Items by Name or Description",
            "Search_NoResults": "No results",
            "Button_ViewAllCollections": "View all the collections",
            "LatestItems_Title1": "Latest",
            "LatestItems_Title2": "Items",
            "PopularItems_Title1": "Most popular",
            "PopularItems_Title2": "Items",
            "LargestCollections_Title1": "Largest",
            "LargestCollections_Title2": "Collections",

            // COLLECTIONS VIEW
            "AllCollectionsView_TitleText_1st": "Get inspired by the ",
            "AllCollectionsView_TitleText_2st": "community's collections.",
            "AllCollectionsView_CreateFAB": "New Collection",

            // COLLECTION CARD
            "CollectionCard_Explore": "Explore",

            // CREATE COLLECTION
            "CreateCollection_Title": "Create collection",
            "CreateCollection_Subtitle": "Complete the form and create a collection",
            "CreateCollection_Name": "Collection Name",
            "CreateCollection_NamePlaceholder": "Xbox Games",
            "CreateCollection_NameRequired": "The collection name is required",
            "CreateCollection_Description": "Description",
            "CreateCollection_DescriptionPlaceholder": "My favorite games",
            "CreateCollection_DescriptionRequired": "The description is required",
            "CreateCollection_Category": "Category",
            "CreateCollection_CategoryRequired": "The category is required",
            "CreateCollection_CategoryPlaceholder": "Select a category",
            "CreateCollection_Image": "Upload an image",
            "CreateCollection_ImageButton": "---",
            "CreateCollection_CreateButton": "Create",

            // EDIT COLLECTION
            "EditCollection_Title": "Edit collection",
            "EditCollection_Subtitle": "Complete the form and edit this collection",
            "EditCollection_EditButton": "Update Changes",

            // ITEM CARD
            "ItemCard_ManagerBadge": "Manager",
            "ItemCard_ViewOption": "View",
            "ItemCard_EditOption": "Edit",
            "ItemCard_DeleteOption": "Delete",

            // CREATE ITEM MODAL
            "CreateItem_Title": "Create Item",
            "CreateItem_Subtitle1": "Complete the form and create",
            "CreateItem_Subtitle2": "an item",
            "CreateItem_Button": "Save Item",
            "Item_Name": "Item Name",
            "Item_NameRequired": "The item name is required",
            "Item_Description": "Description",
            "Item_DescriptionPlaceholder": "Describe your item",
            "Item_Image": "Upload an image",

            // EDIT ITEM MODAL
            "EditItem_Title": "Edit Item",
            "EditItem_Subtitle1": "Make changes to an item in ",
            "EditItem_Subtitle2": "this form",
            "EditItem_Button": "Save changes",

            // ITEM VIEW
            "ItemView_AddAComment": "Add a comment",
            "ItemView_CommentAs": "You are commenting as {{name}}",
            "ItemView_NoComments": "No comments yet...",

            // PROFILE
            "Profile_Title1": "Your collections in ",
            "Profile_Title2": "one place.",
            "Profile_NoCollections": "You don't have collections yet...",
            "Profile_SalesforceButton": "Sign up for exclusive offers",

            // ADMIN PANEL
            "AdminPanel_Title1": "Manage all ",
            "AdminPanel_Title2": "your users",
            "AdminPanel_TableName": "Name",
            "AdminPanel_TableEmail": "Email",
            "AdminPanel_TableTime": "Time since register",
            "AdminPanel_TableAccess": "Access",
            "AdminPanel_TableStatus": "Status",
            "AdminPanel_Admin": "Admin",
            "AdminPanel_User": "User",
            "AdminPanel_Active": "Active",
            "AdminPanel_Blocked": "Blocked",

            // DIALOGS
            "DeleteCollection_Title": "Delete collection?",
            "DeleteCollection_Message": "Are you sure you want to delete this collection? All of your data will be permanently removed.",
            "ActionApplied": "Action applied successfully.",
            "Error_AdminAccess": "Forbidden. You don't have admin access.",
            "Error_Forbidden": "Forbidden.",

            "BlockUser_Title": "Block",
            "UnlockUser_Title": "Unlock",
            "AssignAsAdmin_Title": "Assign as Admin",
            "AssignAsUser_Title": "Assign as User",
            "DeleteUser_Title": "Delete",
            "User_Message": "Are you sure you want to {{actionName}} {{users}} user(s)?",

            "CancelButton": "Cancel",
            "ConfirmButton": "Confirm",

            // FOOTER
            "Footer": "All rights reserved.",


            // SALESFORCE
            "SalesforceContact_Title": "Don't miss out on our latest updates!",
            "SalesforceContact_Subtitle": "Complete the form to receive exclusive offers, personalized updates, and special content straight to your inbox.",
            "SalesforceContact_FieldRequired": "This field is required",
            "SalesforceContact_firstName": "First name",
            "SalesforceContact_lastName": "Last name",
            "SalesforceContact_Phone": "Phone",
            "SalesforceContact_PhoneLength": "The phone must have exactly 10 digits",
            "SalesforceContact_Send": "Send",
            "SalesforceContact_SuccessMessage": "Thank you for staying connected!",
        }
    },
    es: {
        translation: {
            // PUBLIC LAYOUT
            "PublicLayout_ActionText": "Comienza a crear tus colecciones... gratis",
            "PublicLayout_RegisterButton": "Registrarse",
            "PublicLayout_LoginButton": "Iniciar sesión",
            "ThemeLight_Text": "Claro",
            "ThemeDark_Text": "Oscuro",

            // LOGIN
            "Login_Email": "Correo electrónico",
            "Login_EmailRequired": "El correo electrónico es obligatorio",
            "Login_Password": "Contraseña",
            "Login_PasswordPlaceholder": "Escribe tu contraseña",
            "Login_PasswordRequired": "La contraseña es obligatoria",

            "Login_SignIn": "Iniciar sesión",
            "Login_Message": "¿No tienes una cuenta?",

            // REGISTER
            "Register_SignUp": "Registrarse",
            "Register_CompleteTheForm": "Completa el formulario para ",
            "Register_CreateYourAccount": "crear tu cuenta",
            "Register_Name": "Nombre",
            "Register_NameRequired": "El nombre es obligatorio",
            "Register_Email": "Correo electrónico",
            "Register_EmailRequired": "El correo electrónico es obligatorio",
            "Register_EmailInvalid": "Correo electrónico no válido",
            "Register_Password": "Contraseña",
            "Register_PasswordRequired": "La contraseña es obligatoria",
            "Register_PasswordLength": "La contraseña debe tener al menos 6 caracteres",
            "Register_PasswordPlaceholder": "Registrar contraseña",
            "Register_ConfirmPassword": "Confirmar contraseña",
            "Register_ConfirmPasswordRequired": "Confirmar la contraseña es obligatorio",
            "Register_PasswordUnmatch": "Las contraseñas no coinciden",

            "Register_Message": "¿Ya tienes una cuenta? ",

            // NAV MENU
            "NavMenu_Greeting": "Hola, {{name}}",
            "NavMenu_Profile": "Perfil",
            "NavMenu_AdminPanel": "Panel de administración",
            "NavMenu_Logout": "Cerrar sesión",

            // HOME
            "Home_Title1": "Explora las historias detrás de ",
            "Home_Title2": "cada colección.",
            "Search_Placeholder": "Busca Ítems por Nombre o Descripción",
            "Search_NoResults": "Sin resultados",
            "Button_ViewAllCollections": "Ver todas las colecciones",
            "LatestItems_Title1": "Últimos",
            "LatestItems_Title2": "Ítems",
            "PopularItems_Title2": "populares",
            "PopularItems_Title1": "Ítems",
            "LargestCollections_Title2": "más grandes",
            "LargestCollections_Title1": "Colecciones",

            // COLLECTIONS VIEW
            "AllCollectionsView_TitleText_1st": "Inspírate con las colecciones de ",
            "AllCollectionsView_TitleText_2st": "la comunidad.",
            "AllCollectionsView_CreateFAB": "Nueva colección",

            // COLLECTION CARD
            "CollectionCard_Explore": "Explorar",

            // CREATE COLLECTION
            "CreateCollection_Title": "Crear colección",
            "CreateCollection_Subtitle": "Completa el formulario y crea una colección",
            "CreateCollection_Name": "Nombre de la colección",
            "CreateCollection_NamePlaceholder": "Juegos de Xbox",
            "CreateCollection_NameRequired": "El nombre de la colección es obligatorio",
            "CreateCollection_Description": "Descripción",
            "CreateCollection_DescriptionPlaceholder": "Mis juegos favoritos",
            "CreateCollection_DescriptionRequired": "La descripción es obligatoria",
            "CreateCollection_Category": "Categoría",
            "CreateCollection_CategoryRequired": "La categoría es obligatoria",
            "CreateCollection_CategoryPlaceholder": "Selecciona una categoría",
            "CreateCollection_Image": "Subir una imagen",
            "CreateCollection_ImageButton": "---",
            "CreateCollection_CreateButton": "Crear",

            // EDIT COLLECTION
            "EditCollection_Title": "Editar colección",
            "EditCollection_Subtitle": "Completa el formulario y edita esta colección",
            "EditCollection_EditButton": "Actualizar cambios",

            // ITEM CARD
            "ItemCard_ManagerBadge": "Gestor",
            "ItemCard_ViewOption": "Ver",
            "ItemCard_EditOption": "Editar",
            "ItemCard_DeleteOption": "Eliminar",

            // CREATE ITEM MODAL
            "CreateItem_Title": "Crear ítem",
            "CreateItem_Subtitle1": "Completa el formulario y crea",
            "CreateItem_Subtitle2": "un ítem",
            "CreateItem_Button": "Guardar ítem",
            "Item_Name": "Nombre del ítem",
            "Item_NameRequired": "El nombre del ítem es obligatorio",
            "Item_Description": "Descripción",
            "Item_DescriptionPlaceholder": "Describe tu ítem",
            "Item_Image": "Subir una imagen",

            // EDIT ITEM MODAL
            "EditItem_Title": "Editar ítem",
            "EditItem_Subtitle1": "Realiza cambios a un ítem en ",
            "EditItem_Subtitle2": "este formulario",
            "EditItem_Button": "Guardar cambios",

            // ITEM VIEW
            "ItemView_AddAComment": "Añadir un comentario",
            "ItemView_CommentAs": "Estás comentando como {{name}}",
            "ItemView_NoComments": "Aún no hay comentarios...",

            // PROFILE
            "Profile_Title1": "Tus colecciones en ",
            "Profile_Title2": "un solo lugar.",
            "Profile_NoCollections": "Aún no tienes colecciones...",
            "Profile_SalesforceButton": "Regístrate para ofertas exclusivas",

            // ADMIN PANEL
            "AdminPanel_Title1": "Administra todos ",
            "AdminPanel_Title2": "tus usuarios",
            "AdminPanel_TableName": "Nombre",
            "AdminPanel_TableEmail": "Correo electrónico",
            "AdminPanel_TableTime": "Tiempo desde el registro",
            "AdminPanel_TableAccess": "Acceso",
            "AdminPanel_TableStatus": "Estado",
            "AdminPanel_Admin": "Administrador",
            "AdminPanel_User": "Usuario",
            "AdminPanel_Active": "Activo",
            "AdminPanel_Blocked": "Bloqueado",

            // DIALOGS
            "DeleteCollection_Title": "¿Eliminar colección?",
            "DeleteCollection_Message": "¿Estás seguro de que deseas eliminar esta colección? Todos tus datos se eliminarán de forma permanente.",
            "ActionApplied": "Acción aplicada con éxito.",
            "Error_AdminAccess": "Prohibido. No tienes acceso de administrador.",
            "Error_Forbidden": "Prohibido.",

            "BlockUser_Title": "Bloquear",
            "UnlockUser_Title": "Desbloquear",
            "AssignAsAdmin_Title": "Asignar como administrador",
            "AssignAsUser_Title": "Asignar como usuario",
            "DeleteUser_Title": "Eliminar",
            "User_Message": "¿Estás seguro de que deseas {{actionName}} {{users}} usuario(s)?",

            "CancelButton": "Cancelar",
            "ConfirmButton": "Confirmar",

            // FOOTER
            "Footer": "Todos los derechos reservados.",


            // SALESFORCE
            "SalesforceContact_Title": "No te pierdas nuestras últimas novedades",
            "SalesforceContact_Subtitle": "Llena el formulario para recibir ofertas exclusivas, actualizaciones personalizadas y contenido especial directo a tu bandeja.",
            "SalesforceContact_FieldRequired": "Este campo es obligatorio",
            "SalesforceContact_firstName": "Nombre",
            "SalesforceContact_lastName": "Apellidos",
            "SalesforceContact_Phone": "Teléfono",
            "SalesforceContact_PhoneLength": "El teléfono debe tener 10 dígitos",
            "SalesforceContact_Send": "Enviar",
            "SalesforceContact_SuccessMessage": "¡Gracias por mantenerte conectado!",
        }
    }
};


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;