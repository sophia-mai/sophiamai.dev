export type ArchiveItem = {
  id: string; type: 'photo' | 'doodle' | 'note'; image?: string; alt?: string;
  title: string; date?: string; context?: string; description: string;
  rotation: number; x: number; y: number; width: number; mobileOrder: number;
  interaction: 'flip'; frontText?: string; crop?: 'cat' | 'person';
};
export const personal: ArchiveItem[] = [
  {id:'spring',type:'photo',image:'/assets/personal/spring.jpg',alt:'Sophia standing beneath pink blossoms',title:'a little hello',description:'Hi, I’m Sophia Mai. Welcome to my little corner of the internet.',rotation:-7,x:8,y:95,width:230,mobileOrder:1,interaction:'flip'},
  {id:'minecraft',type:'photo',image:'/assets/personal/minecraft.png',alt:'Sophia smiling in a Minecraft-themed room',title:'out and about',description:'A moment from my camera roll. More of the story to come.',rotation:6,x:71,y:290,width:250,mobileOrder:3,interaction:'flip'},
  {id:'winter',type:'photo',image:'/assets/personal/winter.jpg',alt:'Sophia wearing a knitted hat and scarf',title:'a winter snapshot',description:'A little piece of my camera roll.',rotation:8,x:19,y:440,width:185,mobileOrder:4,interaction:'flip'},
];
export const doodles: ArchiveItem[] = [
  {id:'cat',type:'doodle',image:'/assets/doodles/notebook-friends.png',alt:'Hand-drawn cat lounging on a box, with a handwritten moo',crop:'cat',title:'moo',context:'from my sketchbook',description:'A cat, a box, and a very convincing moo. Date and story to be added.',rotation:-5,x:5,y:105,width:460,mobileOrder:1,interaction:'flip'},
  {id:'flower-friend',type:'doodle',image:'/assets/doodles/notebook-friends.png',alt:'Hand-drawn character wearing a flower shirt',crop:'person',title:'a flower-shirt friend',context:'from my sketchbook',description:'One of my little notebook inhabitants. Date and story to be added.',rotation:6,x:66,y:40,width:260,mobileOrder:2,interaction:'flip'},
  {id:'note',type:'note',title:'the margins',frontText:'usually found in the margins.\nsometimes during class.\nsometimes instead of work.',description:'A home for the doodles that would otherwise disappear into notebooks.',rotation:3,x:53,y:390,width:300,mobileOrder:3,interaction:'flip'},
];
export const photos: ArchiveItem[] = [
  {id:'beach',type:'photo',image:'/assets/photos/beach.png',alt:'Colorful beach chairs and readers beside the ocean',title:'a day by the water',description:'A photograph I took. Location and date to be added.',rotation:-4,x:5,y:95,width:500,mobileOrder:1,interaction:'flip'},
  {id:'goat',type:'photo',image:'/assets/photos/goat.png',alt:'A goat on a wooden bridge against a blue sky',title:'taking the scenic route',description:'A photograph I took. Location and date to be added.',rotation:7,x:60,y:310,width:360,mobileOrder:3,interaction:'flip'},
  {id:'friends',type:'photo',image:'/assets/photos/friends.png',alt:'Friends gathered around a giant Jenga game',title:'good company',description:'A snapshot with friends. More of the story to come.',rotation:5,x:67,y:5,width:230,mobileOrder:2,interaction:'flip'},
  {id:'bird-photo',type:'photo',image:'/assets/photos/cockatiel.jpg',alt:'A yellow-faced cockatiel perched on cardboard',title:'a feathered face',description:'Another bird photograph from my collection. Name and story to be added.',rotation:-8,x:18,y:510,width:200,mobileOrder:4,interaction:'flip'},
];
export const projects: ArchiveItem[] = [
  {id:'this-site',type:'note',title:'this little website',frontText:'01 / this little website\n\nA place for things\nI don’t want to lose.\n\n↗ always a work in progress',context:'a digital sketchbook',description:'Built with Next.js and TypeScript. A collection that can keep growing, one object at a time.',rotation:-4,x:12,y:100,width:360,mobileOrder:1,interaction:'flip'},
  {id:'next-project',type:'note',title:'room for something new',frontText:'something else goes here…\n\n[ future project / artwork ]',description:'Placeholder: replace this entry with a real project, artwork, experiment, or unfinished idea.',rotation:6,x:60,y:220,width:300,mobileOrder:2,interaction:'flip'},
];
export const discovery: ArchiveItem = {id:'discovery',type:'note',title:'you found it :)',frontText:'a tiny secret\n\n✳',description:'Most things around here have another side. Try inspecting some of the things you passed on your way down.',rotation:-6,x:0,y:0,width:240,mobileOrder:1,interaction:'flip'};
