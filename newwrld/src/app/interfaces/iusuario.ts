export interface IUsuario {
  email: string | null;  // Correo del usuario
  idUsuario: number;  // ID único del usuario
  nusuario: string | null;  // Nombre de usuario
  imagen?: string | null;  // URL de la imagen del perfil
  fecha: string;  // Fecha de registro o actualización
  biografia?: string | null;  // Campo para la biografía
  socialLinks?: string[];  // Campo para enlaces a redes sociales
}