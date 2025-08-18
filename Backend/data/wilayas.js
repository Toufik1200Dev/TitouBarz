// Complete Algerian Wilayas and Communes with Delivery Prices
const wilayas = [
  {
    id: '1',
    name: 'Adrar',
    communes: [
      'Adrar', 'Tamest', 'Reggane', 'In Zghmir', 'Tit', 'Zaouiet Kounta', 
      'Ksar Kaddour', 'Timimoun', 'Ouled Aissa', 'Bouda', 'Akabli', 'Sali', 
      'Talmine', 'Aougrout', 'Charouine', 'Deldoul', 'Sbaa'
    ],
    deliveryPrice: 1300
  },
  {
    id: '2',
    name: 'Chlef',
    communes: [
      'Chlef', 'Ténès', 'Benairia', 'El Karimia', 'Oued Fodda', 'Ouled Ben Abdelkader',
      'Boukadir', 'Beni Rached', 'El Marsa', 'Harchoun', 'Ouled Fares', 'Tadjna',
      'Taougrit', 'El Hadjadj', 'Ouled Abbes', 'Sidi Akkacha', 'Sobha'
    ],
    deliveryPrice: 750
  },
  {
    id: '3',
    name: 'Laghouat',
    communes: [
      'Laghouat', 'Ksar El Hirane', 'Hassi R\'Mel', 'Aflou', 'El Assafia', 'Oued Morra',
      'Gueltat Sidi Saad', 'Hassi Delaa', 'Tadjmout', 'Kheneg', 'El Ghicha', 'Hassi R\'Mel',
      'Ain Madhi', 'Tadjrouna', 'Sidi Makhlouf', 'El Beidha', 'Sidi Slimane'
    ],
    deliveryPrice: 950
  },
  {
    id: '4',
    name: 'Oum El Bouaghi',
    communes: [
      'Oum El Bouaghi', 'Ain Beida', 'Ain M\'Lila', 'Ain Babouche', 'Ain Fakroun',
      'Ain Kercha', 'Dhalaa', 'F\'Kirina', 'Ouled Gacem', 'Sigus', 'El Amiria',
      'Ouled Hamla', 'Meskiana', 'Ain Zitoun', 'Berriche', 'Ouled Zouai'
    ],
    deliveryPrice: 850
  },
  {
    id: '5',
    name: 'Batna',
    communes: [
      'Batna', 'Merouana', 'Seriana', 'Menaa', 'El Madher', 'Tazoult', 'N\'Gaous',
      'Guigba', 'Inoughissen', 'Maafa', 'Arris', 'Barika', 'Djezzar', 'Timgad',
      'Fesdis', 'Ouled Si Slimane', 'Chemora', 'Oued Chaaba', 'Bouzina'
    ],
    deliveryPrice: 850
  },
  {
    id: '6',
    name: 'Béjaïa',
    communes: [
      'Béjaïa', 'Amizour', 'Feraoun', 'Tazmalt', 'Béni Maouche', 'Timezrit',
      'Souk El Tenine', 'M\'Cisna', 'Ighil Ali', 'Adekar', 'Akbou', 'Seddouk',
      'Tichy', 'Aokas', 'Darguina', 'Sidi Aich', 'El Kseur', 'Barbacha',
      'Kendira', 'Tifra', 'Beni Djellil', 'Souk Oufella', 'Taskriout'
    ],
    deliveryPrice: 750
  },
  {
    id: '7',
    name: 'Biskra',
    communes: [
      'Biskra', 'Oumache', 'Branis', 'Chetma', 'Ouled Djellal', 'Sidi Okba',
      'M\'Chouneche', 'Mekhadma', 'El Haouch', 'Ain Naga', 'Zeribet El Oued',
      'El Outaya', 'Lioua', 'Lichana', 'Ourlal', 'M\'Lili', 'Djemorah',
      'Tolga', 'Bordj Ben Azzouz', 'El Kantara', 'Ain Zaatout', 'Bouchagroun'
    ],
    deliveryPrice: 900
  },
  {
    id: '8',
    name: 'Béchar',
    communes: [
      'Béchar', 'Erg Ferradj', 'Ouled Khodeir', 'Meridja', 'Timoudi', 'Boukais',
      'Mechraa Houari Boushaki', 'Kenadsa', 'Igli', 'Tabelbala', 'Taghit',
      'El Ouata', 'Kerzaz', 'Ouled Khodeir', 'Boukais', 'Abadla', 'Beni Ounif'
    ],
    deliveryPrice: 1200
  },
  {
    id: '9',
    name: 'Blida',
    communes: [
      'Blida', 'Chebli', 'Bouinan', 'Oued Alleug', 'Ouled Yaich', 'Chiffa',
      'Hammam Melouane', 'Ben Khlil', 'Soumaa', 'Guerouaou', 'Ain Romana',
      'Djebabra', 'Bouarfa', 'Beni Tamou', 'Souidania', 'Beni Mered',
      'Boufarik', 'Oued Djer', 'Larbaa', 'Meftah', 'Ouled Slama'
    ],
    deliveryPrice: 600
  },
  {
    id: '10',
    name: 'Bouira',
    communes: [
      'Bouira', 'El Asnam', 'Guerrouma', 'Souk El Khemis', 'Kadiria', 'Hanif',
      'Dirah', 'Ain Bessam', 'Bechloul', 'Bir Ghbalou', 'Bordj Okhriss',
      'El Hachimia', 'Sour El Ghozlane', 'Maala', 'Ain El Hadjar', 'Haizer',
      'Aghbalou', 'Taghzout', 'Ain Turk', 'Bouderbala', 'El Adjiba'
    ],
    deliveryPrice: 650
  },
  {
    id: '11',
    name: 'Tamanrasset',
    communes: [
      'Tamanrasset', 'Abalessa', 'In Ghar', 'In Guezzam', 'Idles', 'Tazrouk',
      'Tin Zaouatine', 'Djanet', 'In Amguel', 'Foggaret Ezzaouia', 'Tamanrasset',
      'In Salah', 'Ain Salah', 'Foggaret Ezzaouia', 'In Ghar', 'In Guezzam'
    ],
    deliveryPrice: 1450
  },
  {
    id: '12',
    name: 'Tébessa',
    communes: [
      'Tébessa', 'Bir El Ater', 'Cheria', 'Stah Guentis', 'El Aouinet', 'El Ogla',
      'Bir Mokadem', 'Negrine', 'El Kouif', 'Morsott', 'El Ma Labiodh', 'Oum Ali',
      'Ain Zerga', 'Bedjene', 'Boulhaf Dir', 'El Meridj', 'El Hamma', 'Nakhess',
      'Ain Fechka', 'El Ogla El Malha', 'Oum Ali', 'Tlidjene'
    ],
    deliveryPrice: 850
  },
  {
    id: '13',
    name: 'Tlemcen',
    communes: [
      'Tlemcen', 'Beni Mester', 'Bensekrane', 'Chetouane', 'Mansourah', 'Nedroma',
      'Remchi', 'El Fehoul', 'Ouled Mimoun', 'Ain Tallout', 'Hennaya', 'Maghnia',
      'Hammam Boughrara', 'Ain Fetah', 'El Aricha', 'Sabra', 'Ghazaouet',
      'Marsa Ben M\'Hidi', 'Ain Ghoraba', 'Chetouane', 'Beni Snous'
    ],
    deliveryPrice: 850
  },
  {
    id: '14',
    name: 'Tiaret',
    communes: [
      'Tiaret', 'Medroussa', 'Ain Deheb', 'Sougueur', 'Frenda', 'Rahouia',
      'Mechraa Sfa', 'Bougara', 'Nadorah', 'Ain Kermes', 'Dahmouni', 'Sidi Ali Mellal',
      'Sidi Bakhti', 'Ain Zarit', 'Naima', 'Tousnina', 'Faidja', 'Sebaine',
      'Rassoul', 'Guertoufa', 'Sidi Hosni', 'Djebilet Rosfa'
    ],
    deliveryPrice: 800
  },
  {
    id: '15',
    name: 'Tizi Ouzou',
    communes: [
      'Tizi Ouzou', 'Ain El Hammam', 'Ouacif', 'Azeffoun', 'Yakouren', 'Draa El Mizan',
      'Tizi Gheniff', 'Boghni', 'Ifigha', 'Ait Aggouacha', 'Mekla', 'Tizi Rached',
      'Irdjen', 'Tizi N\'Tleta', 'Beni Douala', 'Ouadhias', 'Azeffoun', 'Tigzirt',
      'Mizrana', 'Imsouhal', 'Tadmait', 'Freha', 'Ain Zaouia', 'Abi Youcef'
    ],
    deliveryPrice: 750
  },
  {
    id: '16',
    name: 'Alger',
    communes: [
      'Alger Centre', 'Bab El Oued', 'Bologhine', 'Casbah', 'Hussein Dey', 'Kouba',
      'El Harrach', 'Baraki', 'Oued Smar', 'Dar El Beida', 'Birkhadem', 'El Biar',
      'Bouzareah', 'Ben Aknoun', 'Hydra', 'El Madania', 'El Mouradia', 'Bab Ezzouar',
      'Bordj El Kiffan', 'El Marsa', 'Rouiba', 'Reghaia', 'Ain Taya', 'Bordj El Bahri',
      'El Kerma', 'Oued Koriche', 'Bourouba', 'El Magharia', 'Oued Smar', 'Sidi Moussa'
    ],
    deliveryPrice: 450
  },
  {
    id: '17',
    name: 'Djelfa',
    communes: [
      'Djelfa', 'El Idrissia', 'Oum Laadham', 'Hassi Bahbah', 'Ain Maabed', 'Sed Rahal',
      'Feidh El Botma', 'Birine', 'Bouira Lahdab', 'Ain Oussara', 'Hassi El Euch',
      'M\'Liliha', 'El Guedid', 'Deldoul', 'Sidi Laadjel', 'Guernini', 'Selmana',
      'Ain Chouhada', 'Oum Laadham', 'El Idrissia', 'Hassi Bahbah', 'Ain Maabed'
    ],
    deliveryPrice: 900
  },
  {
    id: '18',
    name: 'Jijel',
    communes: [
      'Jijel', 'El Ancer', 'Sidi Maarouf', 'El Milia', 'Settara', 'El Kennar Nouchfi',
      'Ghebala', 'Bouraoui Belhadef', 'Djemaa Beni Habibi', 'Bordj Taher', 'Emir Abdelkader',
      'Chekfa', 'Ghebala', 'El Kennar Nouchfi', 'Settara', 'El Milia', 'Sidi Maarouf',
      'El Ancer', 'Bouraoui Belhadef', 'Djemaa Beni Habibi', 'Bordj Taher', 'Emir Abdelkader'
    ],
    deliveryPrice: 850
  },
  {
    id: '19',
    name: 'Sétif',
    communes: [
      'Sétif', 'El Eulma', 'Ain Oulmene', 'Ain Azel', 'Bougaa', 'Babor', 'Guidjel',
      'Hammam Guergour', 'Ain Arnat', 'Bir Haddada', 'El Ouricia', 'Tizi N\'Bechar',
      'Ain Abessa', 'Ain Lahdjar', 'Ain Sebt', 'Ain Roua', 'Draa Kebila', 'Tala Ifacene',
      'Ain Legradj', 'Ain Azel', 'Bougaa', 'Babor', 'Guidjel', 'Hammam Guergour'
    ],
    deliveryPrice: 800
  },
  {
    id: '20',
    name: 'Saïda',
    communes: [
      'Saïda', 'Doui Thabet', 'Ain Soltane', 'Ouled Brahim', 'Moulay Larbi', 'Ain El Hadjar',
      'Sidi Boubekeur', 'El Hassasna', 'Youb', 'Tircine', 'Ain Skhouna', 'Maamora',
      'Ouled Khaled', 'Ain El Hadjar', 'Sidi Boubekeur', 'El Hassasna', 'Youb', 'Tircine',
      'Ain Skhouna', 'Maamora', 'Ouled Khaled', 'Doui Thabet', 'Ain Soltane'
    ],
    deliveryPrice: 850
  },
  {
    id: '21',
    name: 'Skikda',
    communes: [
      'Skikda', 'Azzaba', 'El Harrouch', 'Tamalous', 'Ain Bouziane', 'Collo', 'Ben Azzouz',
      'Ouldja Boulballout', 'Kerkera', 'Emdjez Edchich', 'Beni Oulbane', 'Ain Kechra',
      'Oum Toub', 'El Ghedir', 'El Marsa', 'Sidi Mezghiche', 'Ain Bouziane', 'Collo',
      'Ben Azzouz', 'Ouldja Boulballout', 'Kerkera', 'Emdjez Edchich', 'Beni Oulbane'
    ],
    deliveryPrice: 800
  },
  {
    id: '22',
    name: 'Sidi Bel Abbès',
    communes: [
      'Sidi Bel Abbès', 'Tessala', 'Sidi Brahim', 'Mostefa Ben Brahim', 'Telagh', 'Dhaya',
      'Chetouane Belaila', 'Tenira', 'Ben Badis', 'Sehala Thaoura', 'Ain Thrid', 'Makedra',
      'Sidi Ali Boussidi', 'Sidi Lahcene', 'Ain Tindamine', 'Moulay Slissen', 'Oued Taourira',
      'Sidi Hamadouche', 'Tessala', 'Sidi Brahim', 'Mostefa Ben Brahim', 'Telagh', 'Dhaya'
    ],
    deliveryPrice: 800
  },
  {
    id: '23',
    name: 'Annaba',
    communes: [
      'Annaba', 'Berrahel', 'El Hadjar', 'Eulma', 'El Bouni', 'Oued El Aneb', 'Tréat',
      'Ain Berda', 'Chetaibi', 'Seraidi', 'El Eulma', 'El Bouni', 'Oued El Aneb', 'Tréat',
      'Ain Berda', 'Chetaibi', 'Seraidi', 'Berrahel', 'El Hadjar', 'Eulma', 'El Bouni'
    ],
    deliveryPrice: 800
  },
  {
    id: '24',
    name: 'Guelma',
    communes: [
      'Guelma', 'Nechmaya', 'Bouati Mahmoud', 'Oued Zenati', 'Tamlouka', 'Ain Makhlouf',
      'Ain Ben Beida', 'Bou Hamdane', 'Ain Larbaa', 'Bou Hachana', 'Hammam Debagh',
      'Ain Sandel', 'Dahouara', 'Belkheir', 'Ben Djarah', 'Bouati Mahmoud', 'Oued Zenati',
      'Tamlouka', 'Ain Makhlouf', 'Ain Ben Beida', 'Bou Hamdane', 'Ain Larbaa'
    ],
    deliveryPrice: 800
  },
  {
    id: '25',
    name: 'Constantine',
    communes: [
      'Constantine', 'Hamma Bouziane', 'El Khroub', 'Ouled Rahmoune', 'Ain Abid', 'Zighoud Youcef',
      'Didouche Mourad', 'Ibn Ziad', 'Beni Hamiden', 'Zitouna', 'El Khroub', 'Hamma Bouziane',
      'Ouled Rahmoune', 'Ain Abid', 'Zighoud Youcef', 'Didouche Mourad', 'Ibn Ziad',
      'Beni Hamiden', 'Zitouna', 'El Khroub', 'Hamma Bouziane', 'Ouled Rahmoune'
    ],
    deliveryPrice: 800
  },
  {
    id: '26',
    name: 'Médéa',
    communes: [
      'Médéa', 'Ouzera', 'Berrouaghia', 'Seghouane', 'Ksar El Boukhari', 'Khemis El Khechna',
      'Sidi Naamane', 'Ouled Antar', 'Tablat', 'Beni Slimane', 'Ain Boucif', 'Souagui',
      'Ouled Hellal', 'El Omaria', 'Derrag', 'Tlatet Ed Douair', 'Beni Slimane', 'Tablat',
      'Ouled Antar', 'Sidi Naamane', 'Khemis El Khechna', 'Ksar El Boukhari', 'Seghouane'
    ],
    deliveryPrice: 700
  },
  {
    id: '27',
    name: 'Mostaganem',
    communes: [
      'Mostaganem', 'Hassi Mamèche', 'Ain Tadles', 'Sour', 'Oued El Kheir', 'Sidi Ali',
      'Abdelmalek Ramdane', 'Hadjadj', 'Nekmaria', 'Sidi Lakhdar', 'Ain Sidi Cherif',
      'Mesra', 'Ain Nouissy', 'Hassiane', 'Safsaf', 'Tounane', 'Achaacha', 'Sidi Ali',
      'Oued El Kheir', 'Sour', 'Ain Tadles', 'Hassi Mamèche', 'Abdelmalek Ramdane'
    ],
    deliveryPrice: 800
  },
  {
    id: '28',
    name: 'M\'Sila',
    communes: [
      'M\'Sila', 'Maadid', 'Hammam Dhalaa', 'Ouled Derradj', 'Sidi Aissa', 'Ain El Hadjel',
      'Ouled Sidi Brahim', 'Sidi Ameur', 'Ben Srour', 'Ouled Addi Guebala', 'Ain El Hadjel',
      'Ouled Sidi Brahim', 'Sidi Ameur', 'Ben Srour', 'Ouled Addi Guebala', 'Maadid',
      'Hammam Dhalaa', 'Ouled Derradj', 'Sidi Aissa', 'Ain El Hadjel', 'Ouled Sidi Brahim'
    ],
    deliveryPrice: 850
  },
  {
    id: '29',
    name: 'Mascara',
    communes: [
      'Mascara', 'Bou Hanifia', 'Tizi', 'Hacine', 'Aouf', 'Ain Fekan', 'Sig', 'El Bordj',
      'Mohammedia', 'Sidi Kada', 'Zelameta', 'Ain Fares', 'Sidi Abdelmoumen', 'Ferraguig',
      'Ghriss', 'El Gaada', 'Zahana', 'Mohammedia', 'El Bordj', 'Sig', 'Ain Fekan',
      'Aouf', 'Hacine', 'Tizi', 'Bou Hanifia'
    ],
    deliveryPrice: 800
  },
  {
    id: '30',
    name: 'Ouargla',
    communes: [
      'Ouargla', 'Ain Beida', 'Ngoussa', 'Hassi Messaoud', 'Rouissat', 'Balidat Ameur',
      'Temacine', 'Zaouia El Abidia', 'Sidi Khouiled', 'El Hadjira', 'N\'Goussa',
      'Hassi Messaoud', 'Rouissat', 'Balidat Ameur', 'Temacine', 'Zaouia El Abidia',
      'Sidi Khouiled', 'El Hadjira', 'Ain Beida', 'Ngoussa', 'Hassi Messaoud'
    ],
    deliveryPrice: 950
  },
  {
    id: '31',
    name: 'Oran',
    communes: [
      'Oran', 'Bir El Djir', 'Es Senia', 'Ain El Turk', 'El Ancar', 'Oued Tlelat',
      'Boutlelis', 'Ain El Kerma', 'Ben Freha', 'Gdyel', 'Hassi Ben Okba', 'Sidi Chami',
      'Bir El Djir', 'Es Senia', 'Ain El Turk', 'El Ancar', 'Oued Tlelat', 'Boutlelis',
      'Ain El Kerma', 'Ben Freha', 'Gdyel', 'Hassi Ben Okba', 'Sidi Chami'
    ],
    deliveryPrice: 800
  },
  {
    id: '32',
    name: 'El Bayadh',
    communes: [
      'El Bayadh', 'Rogassa', 'Brezina', 'El Abiodh Sidi Cheikh', 'Arbaouet', 'Boualem',
      'El Bnoud', 'Chellala', 'Krakda', 'El Kheither', 'Brezina', 'El Abiodh Sidi Cheikh',
      'Arbaouet', 'Boualem', 'El Bnoud', 'Chellala', 'Krakda', 'El Kheither', 'Rogassa',
      'Brezina', 'El Abiodh Sidi Cheikh', 'Arbaouet', 'Boualem'
    ],
    deliveryPrice: 900
  },
  {
    id: '33',
    name: 'Illizi',
    communes: [
      'Illizi', 'Djanet', 'In Amenas', 'Bordj Omar Driss', 'Debdeb', 'Bordj El Haouas',
      'In Amenas', 'Bordj Omar Driss', 'Debdeb', 'Bordj El Haouas', 'Djanet', 'Illizi'
    ],
    deliveryPrice: 1950
  },
  {
    id: '34',
    name: 'Bordj Bou Arreridj',
    communes: [
      'Bordj Bou Arreridj', 'Ras El Oued', 'Bordj Zemoura', 'Mansourah', 'El M\'hir',
      'Ben Daoud', 'El Achir', 'Ain Taghrout', 'Bordj Ghdir', 'Colla', 'Tefreg',
      'Taglait', 'El Anseur', 'Tassamert', 'El Achir', 'Ain Taghrout', 'Bordj Ghdir',
      'Colla', 'Tefreg', 'Taglait', 'El Anseur', 'Tassamert'
    ],
    deliveryPrice: 750
  },
  {
    id: '35',
    name: 'Boumerdès',
    communes: [
      'Boumerdès', 'Boudouaou', 'Isser', 'Khemis El Khechna', 'Thenia', 'Corso',
      'Naciria', 'Baghlia', 'Sidi Daoud', 'Dellys', 'Ammal', 'Beni Amrane',
      'Souk El Had', 'Thenia', 'Corso', 'Naciria', 'Baghlia', 'Sidi Daoud',
      'Dellys', 'Ammal', 'Beni Amrane', 'Souk El Had'
    ],
    deliveryPrice: 600
  },
  {
    id: '36',
    name: 'El Tarf',
    communes: [
      'El Tarf', 'Bouhadjar', 'Ben M\'Hidi', 'Bouteldja', 'El Kala', 'Ain El Assel',
      'Chebaita Mokhtar', 'Besbes', 'Asfour', 'Zitouna', 'Bouhadjar', 'Ben M\'Hidi',
      'Bouteldja', 'El Kala', 'Ain El Assel', 'Chebaita Mokhtar', 'Besbes', 'Asfour',
      'Zitouna', 'Bouhadjar', 'Ben M\'Hidi', 'Bouteldja'
    ],
    deliveryPrice: 850
  },
  {
    id: '37',
    name: 'Tindouf',
    communes: [
      'Tindouf', 'Oum El Assel', 'Tindouf', 'Oum El Assel'
    ],
    deliveryPrice: 1450
  },
  {
    id: '38',
    name: 'Tissemsilt',
    communes: [
      'Tissemsilt', 'Bordj Bounaama', 'Theniet El Had', 'Lazharia', 'Beni Chaib',
      'Ouled Bessem', 'Lardjem', 'Maacem', 'Sidi Lantri', 'Boucaid', 'Ammari',
      'Youssoufia', 'Lazharia', 'Beni Chaib', 'Ouled Bessem', 'Lardjem', 'Maacem',
      'Sidi Lantri', 'Boucaid', 'Ammari', 'Youssoufia'
    ],
    deliveryPrice: 850
  },
  {
    id: '39',
    name: 'El Oued',
    communes: [
      'El Oued', 'Robbah', 'Oued El Alenda', 'Bayadha', 'Nakhla', 'Guemar',
      'Kouinine', 'Reguiba', 'Hamraia', 'Taghzout', 'Debila', 'Hassani Abdelkrim',
      'Taleb Larbi', 'Magrane', 'El M\'Ghair', 'Oum Tiour', 'Djamaa', 'Tendla',
      'Still', 'El Goléa', 'Robbah', 'Oued El Alenda'
    ],
    deliveryPrice: 950
  },
  {
    id: '40',
    name: 'Khenchela',
    communes: [
      'Khenchela', 'Kais', 'Ouled Rechache', 'El Hamma', 'Ain Touila', 'Babar',
      'Tamza', 'Bouhmama', 'El Oueldja', 'Remila', 'El Hamma', 'Ain Touila',
      'Babar', 'Tamza', 'Bouhmama', 'El Oueldja', 'Remila', 'Kais', 'Ouled Rechache',
      'El Hamma', 'Ain Touila', 'Babar'
    ],
    deliveryPrice: 850
  },
  {
    id: '41',
    name: 'Souk Ahras',
    communes: [
      'Souk Ahras', 'Sedrata', 'Hannacha', 'Mechroha', 'Ouled Driss', 'Tiffech',
      'Zaarouria', 'Drea', 'Haddada', 'Khedara', 'Sedrata', 'Hannacha', 'Mechroha',
      'Ouled Driss', 'Tiffech', 'Zaarouria', 'Drea', 'Haddada', 'Khedara', 'Sedrata',
      'Hannacha', 'Mechroha'
    ],
    deliveryPrice: 850
  },
  {
    id: '42',
    name: 'Tipaza',
    communes: [
      'Tipaza', 'Menaceur', 'Larhat', 'Douaouda', 'Bou Ismaïl', 'Kolea', 'Attatba',
      'Chaiba', 'Ain Tagourait', 'Hadjout', 'Sidi Rached', 'Nador', 'Hadjout',
      'Ain Tagourait', 'Chaiba', 'Attatba', 'Kolea', 'Bou Ismaïl', 'Douaouda',
      'Larhat', 'Menaceur', 'Tipaza'
    ],
    deliveryPrice: 650
  },
  {
    id: '43',
    name: 'Mila',
    communes: [
      'Mila', 'Ferdjioua', 'Grarem Gouga', 'Oued Endja', 'Rouached', 'Tassadane Haddada',
      'Sidi Merouane', 'Tadjenanet', 'Benyahia Abderrahmane', 'Terrai Bainen', 'Ferdjioua',
      'Grarem Gouga', 'Oued Endja', 'Rouached', 'Tassadane Haddada', 'Sidi Merouane',
      'Tadjenanet', 'Benyahia Abderrahmane', 'Terrai Bainen', 'Ferdjioua', 'Grarem Gouga'
    ],
    deliveryPrice: 800
  },
  {
    id: '44',
    name: 'Aïn Defla',
    communes: [
      'Aïn Defla', 'Miliana', 'Boumedfaa', 'Khemis Miliana', 'Hammam Righa', 'Arib',
      'Djelida', 'El Amra', 'Boufarik', 'El Attaf', 'Miliana', 'Boumedfaa',
      'Khemis Miliana', 'Hammam Righa', 'Arib', 'Djelida', 'El Amra', 'Boufarik',
      'El Attaf', 'Miliana', 'Boumedfaa', 'Khemis Miliana'
    ],
    deliveryPrice: 750
  },
  {
    id: '45',
    name: 'Naâma',
    communes: [
      'Naâma', 'Mechria', 'Ain Sefra', 'Tiout', 'Sfissifa', 'Moghrar', 'Assela',
      'Djeniene Bourezg', 'Ain Ben Khelil', 'Makman Ben Amer', 'Mechria', 'Ain Sefra',
      'Tiout', 'Sfissifa', 'Moghrar', 'Assela', 'Djeniene Bourezg', 'Ain Ben Khelil',
      'Makman Ben Amer', 'Mechria', 'Ain Sefra', 'Tiout'
    ],
    deliveryPrice: 950
  },
  {
    id: '46',
    name: 'Aïn Témouchent',
    communes: [
      'Aïn Témouchent', 'Chaabet El Leham', 'Chentouf', 'Hammam Bou Hadjar', 'Bou Zedjar',
      'Oued Berkeche', 'Ain Tolba', 'Ain Kihal', 'Emir Abdelkader', 'Hassasna',
      'Chaabet El Leham', 'Chentouf', 'Hammam Bou Hadjar', 'Bou Zedjar', 'Oued Berkeche',
      'Ain Tolba', 'Ain Kihal', 'Emir Abdelkader', 'Hassasna', 'Chaabet El Leham'
    ],
    deliveryPrice: 850
  },
  {
    id: '47',
    name: 'Ghardaïa',
    communes: [
      'Ghardaïa', 'El Meniaa', 'Hassi Fehal', 'Metlili', 'Berriane', 'El Guerrara',
      'Zelfana', 'Sebseb', 'Bounoura', 'El Atteuf', 'El Meniaa', 'Hassi Fehal',
      'Metlili', 'Berriane', 'El Guerrara', 'Zelfana', 'Sebseb', 'Bounoura',
      'El Atteuf', 'El Meniaa', 'Hassi Fehal', 'Metlili'
    ],
    deliveryPrice: 950
  },
  {
    id: '48',
    name: 'Relizane',
    communes: [
      'Relizane', 'Oued Rhiou', 'Belaassel Bouzegza', 'Sidi M\'Hamed Ben Ali',
      'Oued El Djemaa', 'Ramka', 'Mendes', 'Lahlef', 'Beni Dergoun', 'Djidiouia',
      'Oued Rhiou', 'Belaassel Bouzegza', 'Sidi M\'Hamed Ben Ali', 'Oued El Djemaa',
      'Ramka', 'Mendes', 'Lahlef', 'Beni Dergoun', 'Djidiouia', 'Oued Rhiou'
    ],
    deliveryPrice: 800
  },
  {
    id: '49',
    name: 'Timimoun',
    communes: [
      'Timimoun', 'Ouled Aissa', 'Charouine', 'Talmine', 'Aougrout', 'Deldoul',
      'Sbaa', 'Ouled Aissa', 'Charouine', 'Talmine', 'Aougrout', 'Deldoul', 'Sbaa'
    ],
    deliveryPrice: 1450
  },
  {
    id: '50',
    name: 'Bordj Badji Mokhtar',
    communes: [
      'Bordj Badji Mokhtar', 'In Ghar', 'Tazrouk', 'In Ghar', 'Tazrouk'
    ],
    deliveryPrice: 1900
  },
  {
    id: '51',
    name: 'Ouled Djellal',
    communes: [
      'Ouled Djellal', 'Ras El Miaad', 'Besbes', 'Doucen', 'Chadames', 'El Meghaier',
      'Ras El Miaad', 'Besbes', 'Doucen', 'Chadames', 'El Meghaier', 'Ouled Djellal'
    ],
    deliveryPrice: 950
  },
  {
    id: '52',
    name: 'Beni Abbes',
    communes: [
      'Beni Abbes', 'Igli', 'El Ouata', 'Kerzaz', 'Ouled Khodeir', 'Igli',
      'El Ouata', 'Kerzaz', 'Ouled Khodeir', 'Beni Abbes'
    ],
    deliveryPrice: 1300
  },
  {
    id: '53',
    name: 'In Salah',
    communes: [
      'In Salah', 'Foggaret Ezzaouia', 'In Ghar', 'Foggaret Ezzaouia', 'In Ghar'
    ],
    deliveryPrice: 1500
  },
  {
    id: '54',
    name: 'In Guezzam',
    communes: [
      'In Guezzam'
    ],
    deliveryPrice: 0
  },
  {
    id: '55',
    name: 'Touggourt',
    communes: [
      'Touggourt', 'Temacine', 'Zaouia El Abidia', 'Blidet Amor', 'El Hadjira',
      'El Alia', 'El Borma', 'Temacine', 'Zaouia El Abidia', 'Blidet Amor',
      'El Hadjira', 'El Alia', 'El Borma'
    ],
    deliveryPrice: 950
  },
  {
    id: '56',
    name: 'Djanet',
    communes: [
      'Djanet', 'Bordj El Haouas', 'Bordj El Haouas'
    ],
    deliveryPrice: 0
  },
  {
    id: '57',
    name: 'El M\'Ghair',
    communes: [
      'El M\'Ghair', 'Oum Tiour', 'Djamaa', 'Tendla', 'Still', 'El Goléa',
      'Oum Tiour', 'Djamaa', 'Tendla', 'Still', 'El Goléa'
    ],
    deliveryPrice: 950
  },
  {
    id: '58',
    name: 'El Meniaa',
    communes: [
      'El Meniaa', 'Hassi Gara', 'Mansourah', 'Sidi Slimane', 'Hassi Gara',
      'Mansourah', 'Sidi Slimane'
    ],
    deliveryPrice: 950
  }
];

module.exports = { wilayas }; 