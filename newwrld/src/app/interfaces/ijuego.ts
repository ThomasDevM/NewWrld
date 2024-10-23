export interface IJuego {
    nombre: string;
    idJuego: number;
    descripcion: string;
    precio: string;
    
    imagen: string; // URL de la portada del juego (string)
    galeria?: string[];
    categorias: string[];  // Este campo será un array de strings
}
