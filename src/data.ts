export type PersonalInfoProps = {
  hourlyRate: number;
}

export type Material = {
    id: string;
    name: string;
    sizes?: number[];
    image?: string;
    size?: number;
    count: number;
  };
  
  export const materials: Material[] = [
    { id: "1", name: 'Stojka bez capa', sizes: [3, 2.5, 2, 1.5,1.4, 1, 0.5], size:0, count: 0 },
    { id: "2", name: 'Stojka s capom', sizes: [3, 2.5, 2, 1.5,1.4, 1, 0.5], size:0, count: 0 },
    {id: "5", name: 'Rígel', sizes: [3, 2.5, 2, 1.5,1.4, 1, 0.7], count: 0},
    {id: "6", name: 'Učko', sizes: [3, 2.5, 2, 1.5,1.4, 1, 0.7, 0.3], count: 0},
    {id: "7", name: 'Podlaha', sizes: [3, 2.5, 2, 1.5,1.4, 1, 0.7], count: 0},
    {id: "14", name: 'Diagonala', sizes: [2.5, 2, 1.5, 1.4, 1, 0.7], count: 0},
    {id: "13", name: 'Pizza Plech', sizes: [3, 2.5, 2, 1.5,1.4, 1, 0.7], count: 0},
    {id: "18", name: 'Okop', sizes: [2.5, 2, 1.5, 1.4, 1, 0.7], count: 0},
    {id: "15", name: 'Konzola', sizes: [1, 0.7, 0.5, 0.3], count: 0},
    { id: "3", name: 'Slniečka', size: 0, count: 0 },
    {id: "4", name: 'Žaba', size: 0, count: 0},
    {id: "8", name: 'Na nožku', size: 0, count: 0},
    {id: "16", name: 'Zub', size: 0, count: 0},
    {id: "17", name: 'Otočná', size: 0, count: 0},
    {id: "9", name: 'Churo', size: 0, count: 0},
    {id: "10", name: 'Rebrík', sizes: [3, 2], count: 0},
    {id: "11", name: 'Prehod', sizes: [1, 0.7], count: 0},
    {id: "12", name: 'Foršta', sizes: [5,4,3,2.5,2,1.5,1,0.5, 0.3], count: 0},
  ];
  