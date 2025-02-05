export const listUsers = [
  {
    name: 'Patito',
    email: 'nena@gmail.com',
    password: 'password123',
  },
  {
    name: 'Nicolas',
    email: 'nico@gmail.com',
    password: 'password123',
  },
  {
    name: 'Pipocas',
    email: 'pipocas@gmail.com',
    password: 'password123',
  },
  {
    name: 'Pelucas',
    email: 'pelucas@gmail.com',
    password: 'password123',
  },
];

export const listVideos = [
  {
    nameVideo: 'Comodo (Remix) - Oma 206 Ft. Jowell y Randy',
    description:
      'Directed By Cesar Berrios y Alvaro Diaz Bacon & Soda Films 2013 www.molinarecords.com Twitter/Instagram- @molinarecords Facebook- Molina Records',
    url: 'https://www.youtube.com/watch?v=VK4RcyZS_EE',
  },
  {
    nameVideo: 'C-Kan - Vuelve ft. MC Davo (Video Oficial)',
    description:
      'Music video by C-Kan performing Vuelve. 2013 Mastered Trax / C-Mobztas',
    url: 'https://www.youtube.com/watch?v=7bPAJgVRzSI&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&start_radio=1&rv=VK4RcyZS_EE',
  },
  {
    nameVideo: 'El Dorado - Una Senda Abriré | Letra',
    description:
      'Gracias por ver, no olviden suscribirse y ser inmensamente felices, sí hay algún error no olviden escribirlo en los comentarios, o quieren pedir alguna canción en específico no olviden enviarme mensaje, o ponerlo en los comentarios, con cariño y amor, Brenda.',
    url: 'https://www.youtube.com/watch?v=NKUIAOD8P_A&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=2',
  },
  {
    nameVideo: 'Queen - The Show Must Go On - Subtitulado',
    description:
      'Canción de la banda de Rock británica Queen dentro de su álbum Innuendo lanzado en 1991. Escrita por Brian May para Freddie Mercury quien se encontraba en sus últimos meses de vida. Lanzada como sencillo el 14 de octubre de 1991 en el Reino Unido, 6 semanas antes de la muerte de Freddie. Freddie Mercury nació en Stone Town, Zanzíbar, 5 de septiembre de 1946 – falleció en Kensington, Londres, Reino Unido, 24 de noviembre de 1991.',
    url: 'https://www.youtube.com/watch?v=3wia7TSyebY',
  },
  {
    nameVideo:
      'Juan Gabriel - Así Fue (En Vivo Desde Bellas Artes, México/ 2013)',
    description:
      'Escucha “Así Fue” del álbum EN VIVO DESDE BELLAS ARTES en tu plataforma favorita: ',
    url: 'https://www.youtube.com/watch?v=I8gLa380bko',
  },
  {
    nameVideo:
      'Paloma Faith - Only Love Can Hurt Like This (Live at The BRIT Awards, 2015)',
    description:
      'Paloma Faith – Only Love Can Hurt Like This (Live from The BRIT Awards, 2015)',
    url: 'https://www.youtube.com/watch?v=_Dat9CRV800',
  },
  {
    nameVideo: '6IX9INE "Gotti" (WSHH Exclusive - Official Music Video)',
    description:
      "WorldstarHipHop is home to everything entertainment & hip hop. The #1 urban outlet responsible for breaking the latest premiere music videos, exclusive artist content, entertainment stories, celebrity rumors, sports highlights, interviews, comedy skits, rap freestyles, crazy fights, eye candy models, the best viral videos & more. Since 2005, WorldstarHipHop has worked with some of our generation's most groundbreaking artists, athletes & musicians - all who have helped continue to define our unique identity and attitude. We plan on continuing to work with only the best, so keep an eye out for all the exciting new projects / collaborations we plan on dropping in the very near future.', url: 'https://www.youtube.com/watch?v=z5WrgDzNIZ0&list=RDMM&start_radio=1&rv=_Dat9CRV800",
    url: 'https://www.youtube.com/watch?app=desktop&v=z5WrgDzNIZ0&t=1m48s',
  },
  {
    nameVideo: 'Scarface | Push It to the Limit',
    description:
      'After Tony Montana kills drug lord Frank Lopez, he finally becomes one of the most powerful drug lords of Miami. Watch the "Push it to the Limit" scene from Scarface!',
    url: 'https://www.youtube.com/watch?v=Olgn9sXNdl0',
  },
  {
    nameVideo:
      'The Godfather – Orchestral Suite // The Danish National Symphony Orchestra (Live)',
    description:
      'In January 2018, The Danish Broadcast Corporation (DR) aired a concert called “The Morricone Duel” performed by The Danish National Symphony Orchestra /DR SymfoniOrkestret, The Danish National Concert Choir with various soloists conducted by Sarah Hicks.  The score is available on all regular Streaming-Platforms.',
    url: 'https://www.youtube.com/watch?v=X-jdl9hcCeg',
  },
  {
    nameVideo: 'Siempre',
    description: 'Provided to YouTube by Universal Music Group',
    url: 'https://www.youtube.com/watch?v=NuIrbz0IRK8',
  },
];

function added(elements, users) {
  let count = 0,
    key = 0;
  for (let i = users; i > 0; i--) {
    while (count < i) {
      console.log(`user: ${i} = ${elements[key]}`);
      key++;
      count++;
    }
    count = 0;
  }
  return;
}

added(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 4);
