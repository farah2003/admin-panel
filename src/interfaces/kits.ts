export interface Kit {
  id: number;
  qrCode: string;
  expirationDate: string;
  kitType: number;
  createdBy: string;
  updatedBy: string;
}

export interface KitsContext {
  kits: Kit[];
  setKits: (kits: Kit[]) => void;
}
