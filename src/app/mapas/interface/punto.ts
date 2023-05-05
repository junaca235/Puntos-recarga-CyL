export interface Puntos {
    nhits:      number;
    parameters: Parameters;
    records:    Record[];
}

export interface Parameters {
    dataset:  Dataset;
    rows:     number;
    start:    number;
    format:   string;
    timezone: string;
}

export enum Dataset {
    PuntosDeRecargaDelVehiculoElectrico = "puntos-de-recarga-del-vehiculo-electrico",
}

export interface Record {
    datasetid:        Dataset;
    recordid:         string;
    fields:           Fields;
    geometry:         Geometry;
    record_timestamp: Date;
    favourite: boolean;//Añadido
}

export interface Fields {
    dms:       string;
    tipo:      string;
    operador:  string;
    direccion: string;
    dd:        number[];
    no:        string;
    nombre:    string;
}

export interface Geometry {
    type:        Type;
    coordinates: number[];
}

export enum Type {
    Point = "Point",
}

//TODO: interfaz de prueba
export interface Marcador {
    dms:       string;
    tipo:      string;
    operador:  string;
    direccion: string;
    dd:        number[];
    no:        string;
    nombre:    string;
}