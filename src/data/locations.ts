export interface Location {
  id: number;
  nome: string;
  tipo: string;
  cidade: string;
  bairro: string;
  endereco: string;
  cep: string;
  capacidade: number;
  descricao_curta: string;
  instagram: string;
  site: string;
  google_maps: string;
  nivel_relevancia: number;
  status_ativo: boolean;
  fonte_verificacao: string;
  coordinates: [number, number];
}

const cityCoords: Record<string, [number, number]> = {
  "Cuiabá": [-15.601, -56.097],
  "Várzea Grande": [-15.646, -56.132],
  "Rondonópolis": [-16.467, -54.633],
  "Sinop": [-11.864, -55.509],
  "Chapada dos Guimarães": [-15.460, -55.749],
  "Tangará da Serra": [-14.620, -57.480],
  "Sorriso": [-12.543, -55.715],
  "Lucas do Rio Verde": [-13.064, -55.912],
  "Primavera do Leste": [-15.559, -54.297],
  "Cáceres": [-16.070, -57.681],
  "Barra do Garças": [-15.893, -52.256],
  "Alta Floresta": [-9.875, -56.086]
};

const rawData = `1,Arena Pantanal,arena_eventos,Cuiabá,Verdão,"Av. Agrícola Paes de Barros, S/N",78030-210,44000,"Principal estádio de Mato Grosso, palco de jogos do Brasileirão, Copa do Mundo e grandes shows nacionais e internacionais.",arenapantanalmt,https://www.secel.mt.gov.br,https://maps.google.com/?q=Arena+Pantanal+Cuiabá,1,true,secel.mt.gov.br
2,Parque Novo Mato Grosso,parque_eventos,Cuiabá,Zona Rural (MT-251),"MT-251, Km 11 - entre Rod. Helder Cândia e Rod. Emanuel Pinheiro",,100000,"Maior complexo de eventos e lazer de Mato Grosso, com arena de shows para 100 mil pessoas, autódromo, kartódromo e lago de 100 hectares.",parquenovomt,,https://maps.google.com/?q=Parque+Novo+Mato+Grosso+Cuiabá,1,true,secom.mt.gov.br
3,Centro de Eventos do Pantanal,centro_convencoes,Cuiabá,Santa Marta,"Av. Bernardo Antônio de Oliveira Neto, S/N",78043-903,30000,"Um dos principais centros de eventos do país, preparado para congressos, feiras, shows e grandes eventos.",centrodeeventosdopantanal,https://www.eventospantanal.com.br,https://maps.google.com/?q=Centro+de+Eventos+do+Pantanal+Cuiabá,1,true,eventospantanal.com.br
4,Allure Music Hall,casa_show,Cuiabá,Ribeirão do Lipa,"Rodovia Arquiteto Helder Cândia, 2044",,5000,"A maior casa de shows do Centro-Oeste, recebe artistas nacionais e internacionais com estrutura moderna e sofisticada.",alluremusichall,https://www.alluremusichall.com.br,https://maps.google.com/?q=Allure+Music+Hall+Cuiabá,1,true,alluremusichall.com.br
5,Sesc Arsenal,centro_cultural,Cuiabá,Centro Sul,"Rua Treze de Junho, S/N",78020-001,1500,"Principal centro cultural de Cuiabá, com teatro, cinema, galeria de artes, biblioteca e eventos semanais como o Bulixo e a Feira do Arsenal.",sescarsenal,https://www.sescmt.com.br,https://maps.google.com/?q=Sesc+Arsenal+Cuiabá,1,true,sescmt.com.br
6,Cine Teatro Cuiabá,teatro,Cuiabá,Centro,"Av. Presidente Getúlio Vargas, S/N",,510,"Inaugurado em 1942, é um dos marcos culturais mais importantes de Cuiabá, com arquitetura art déco e palco italiano com 510 lugares.",cineteatrocba,https://cineteatrocuiaba.org.br,https://maps.google.com/?q=Cine+Teatro+Cuiabá,1,true,cineteatrocuiaba.org.br
7,Teatro do Cerrado Zulmira Canavarros,teatro,Cuiabá,Centro Político Administrativo,Próximo à Assembleia Legislativa,,769,"Inaugurado em 2014, teatro moderno com acessibilidade completa e capacidade para 769 espectadores.",,,https://maps.google.com/?q=Teatro+Zulmira+Canavarros+Cuiabá,1,true,gurudacidade.com.br
8,Teatro Universitário da UFMT,teatro,Cuiabá,Boa Esperança,Av. Fernando Corrêa da Costa - Campus UFMT,,516,"Primeiro teatro do estado com estrutura completa para artistas e público, com 2.735m² de área construída e 516 lugares.",,https://www.ufmt.br/pagina/teatro-universitario/419,https://maps.google.com/?q=Teatro+Universitário+UFMT+Cuiabá,2,true,ufmt.br
9,Malcom Pub,bar_musical,Cuiabá,Santa Rosa,"Av. Miguel Sutil, 10.240",78015-100,600,"Casa do Rock N' Roll de Cuiabá há mais de 11 anos, com bandas ao vivo e DJ nas sextas e sábados. Referência da cena rock da cidade.",malcompub,https://www.malcompub.com.br,https://maps.google.com/?q=Malcom+Pub+Cuiabá,1,true,malcompub.com.br
10,Musiva,casa_show,Cuiabá,Porto,"Av. Manoel José de Arruda, 4435",78055-498,2000,"Casa de shows e eventos à beira do Rio Cuiabá, com programação variada de música ao vivo e festas.",musivacuiaba,,https://maps.google.com/?q=Musiva+Cuiabá,2,true,sympla.com.br
11,Ditado Popular,bar_musical,Cuiabá,Popular,"Rua Sen. Vilas Bôas, 89 - Praça Popular",,300,"Bar despojado na Praça Popular com música ao vivo todos os dias, eleito melhor cozinha de bar e happy hour de Cuiabá pela Veja Comer & Beber.",ditadopopularcuiaba,,https://maps.google.com/?q=Ditado+Popular+Cuiabá,2,true,olivre.com.br
12,Valley Pub,bar_musical,Cuiabá,Popular,"Av. Isaac Póvoas, 1157",,400,"Pub com temática sertaneja e música ao vivo de terça a domingo, um dos pontos mais tradicionais da vida noturna cuiabana.",valley.pub,,https://maps.google.com/?q=Valley+Pub+Cuiabá,2,true,tripadvisor.com
13,Bar do Jarbas,bar_musical,Cuiabá,Dom Aquino,"Rua Des. Alírio Figueiredo, 188",,200,"Campeão do Veja Comer & Beber em melhor boteco, melhor caipirinha e cozinha de bar. Música ao vivo todos os dias.",bardojarbas,,https://maps.google.com/?q=Bar+do+Jarbas+Cuiabá,2,true,olivre.com.br
14,Mundaréo,bar_musical,Cuiabá,Jardim Primavera,"Rua Dr. Lima Avelino, 192",,250,"Bicampeão de Melhor Bar de Música ao Vivo de Cuiabá (Veja Comer & Beber), com ambiente arborizado e iluminação à lamparina.",mundareocuiaba,,https://maps.google.com/?q=Mundaréo+Cuiabá,2,true,olivre.com.br
15,Bar do Azeitona,bar_musical,Cuiabá,Popular,Praça Popular,,200,Bar tradicional na Praça Popular com chopp em canecas congeladas e programação musical diferente a cada dia.,bardoazeitonacuiaba,,https://maps.google.com/?q=Bar+do+Azeitona+Praça+Popular+Cuiabá,3,true,olivre.com.br
16,Bar do Edgare,bar_musical,Cuiabá,Jardim Primavera,"Rua Traçaia, 280",,150,"Bar com música ao vivo a partir de quinta-feira, funcionando de terça a sábado no bairro Jardim Primavera.",,,https://maps.google.com/?q=Bar+do+Edgare+Cuiabá,3,true,olivre.com.br
17,Barhen Lounge Bar,bar_musical,Cuiabá,Goiabeiras,"Av. Isaac Póvoas, 880",,200,"Bar moderno com drinks, petiscos e música ao vivo, voltado para o público jovem no bairro Goiabeiras.",barhencba,,https://maps.google.com/?q=Barhen+Lounge+Bar+Cuiabá,3,true,tiktok.com/@voindica
18,Zenaide Bar,bar_musical,Cuiabá,Jardim Aclimação,Pantanal Shopping - Rua do Pan,,300,"Franquia premiada como um dos melhores bares do Brasil, com cerveja gelada em menos de 1 minuto e música ao vivo.",zenaide.cuiaba,,https://maps.google.com/?q=Zenaide+Bar+Pantanal+Shopping+Cuiabá,2,true,tiktok.com/@voindica
19,Espaço Cultural Beco do Papa,centro_cultural,Cuiabá,Centro,Centro Histórico de Cuiabá,,300,"Espaço que abriga a cena independente de Cuiabá com eventos culturais, musicais e artísticos.",becododpapa,,https://maps.google.com/?q=Beco+do+Papa+Cuiabá,2,true,tripadvisor.com
20,Espaço Cultural Liu Arruda,centro_cultural,Cuiabá,Centro Político Administrativo,"Rua Conselheiro Benjamin Duarte Monteiro, 01 - TCE",,200,"Espaço cultural dentro do Tribunal de Contas do Estado, homenageando o humorista Liu Arruda e a cuiabania.",,,https://maps.google.com/?q=Espaço+Cultural+Liu+Arruda+Cuiabá,3,true,gurudacidade.com.br
21,Museu de História Natural de Mato Grosso,museu,Cuiabá,Boa Esperança,Av. Fernando Corrêa da Costa - Próximo à UFMT,,500,"Museu com exposições sobre a fauna e flora do Pantanal e Cerrado, aberto de quarta a domingo com área verde gratuita.",museuhistorianaturalmt,,https://maps.google.com/?q=Museu+História+Natural+Mato+Grosso+Cuiabá,2,true,instagram.com/museuhistorianaturalmt
22,Clube da Caixa,casa_show,Cuiabá,Jardim Nossa Sra. Aparecida,"Rod. Palmiro Paes de Barros, KM 2",,3000,"Espaço amplo para shows e eventos, frequentemente utilizado para grandes apresentações musicais.",,,https://maps.google.com/?q=Clube+da+Caixa+Cuiabá,2,true,sympla.com.br
23,Gui Mamute Estúdio,casa_show,Cuiabá,Boa Esperança,"Rua Treze, 266",,500,"Estúdio e espaço de eventos com foco em música, recebendo shows intimistas e gravações.",guimamuteestudio,,https://maps.google.com/?q=Gui+Mamute+Estúdio+Cuiabá,3,true,sympla.com.br
24,Casa de Festas Cuiabá,casa_show,Cuiabá,,,,2000,Espaço para festas e shows com programação regular de eventos musicais e culturais.,casadefestascuiaba,https://www.casadefestas.net,,2,true,casadefestas.net
25,Parque das Águas,parque_eventos,Cuiabá,Morada da Serra,Av. Beira Rio,,5000,"Parque público com área verde, pistas de caminhada e espaço para eventos culturais ao ar livre.",,,https://maps.google.com/?q=Parque+Das+Águas+Cuiabá,2,true,prefeitura.cuiaba.mt.gov.br
26,Parque Tia Nair,parque_eventos,Cuiabá,Morada da Serra,Av. Mato Grosso,,3000,Parque urbano com área de lazer e espaço para eventos comunitários e culturais.,,,https://maps.google.com/?q=Parque+Tia+Nair+Cuiabá,3,true,prefeitura.cuiaba.mt.gov.br
27,Parque Mãe Bonifácia,parque_eventos,Cuiabá,Duque de Caxias,Av. Miguel Sutil,,2000,Área de preservação ambiental com trilhas e espaço para eventos culturais ao ar livre no coração de Cuiabá.,,,https://maps.google.com/?q=Parque+Mãe+Bonifácia+Cuiabá,2,true,secom.mt.gov.br
28,Parque Massairo Okamura,parque_eventos,Cuiabá,Morada da Serra,,,2000,"Parque urbano utilizado para eventos culturais, feiras e atividades ao ar livre.",,,https://maps.google.com/?q=Parque+Massairo+Okamura+Cuiabá,3,true,secom.mt.gov.br
29,Parque Zé Bolo Flô,parque_eventos,Cuiabá,Bandeirantes,,,1000,"Parque cultural que homenageia personagem folclórico cuiabano, com espaço para eventos e manifestações culturais.",,,https://maps.google.com/?q=Parque+Zé+Bolo+Flô+Cuiabá,3,true,secom.mt.gov.br
30,Horto Florestal,parque_eventos,Cuiabá,Coxipó,,,3000,"Área verde com infraestrutura para eventos ao ar livre, feiras e atividades culturais.",,,https://maps.google.com/?q=Horto+Florestal+Cuiabá,3,true,secom.mt.gov.br
31,Shopping Estação Cuiabá,shopping,Cuiabá,Jardim Leblon,"Av. Miguel Sutil, 9300",78040-365,5000,"Um dos maiores shoppings de Cuiabá com lojas nacionais, praça de alimentação, Cinépolis e espaço para eventos.",shoppingestacaocuiaba,https://www.shoppingestacaocuiaba.com.br,https://maps.google.com/?q=Shopping+Estação+Cuiabá,1,true,shoppingestacaocuiaba.com.br
32,Pantanal Shopping,shopping,Cuiabá,Jardim Aclimação,"Av. Historiador Rubens de Mendonça, 945",,5000,"O maior shopping center de Cuiabá, com ampla variedade de lojas, restaurantes, cinema Cine Araujo e eventos.",pantanalshopping,,https://maps.google.com/?q=Pantanal+Shopping+Cuiabá,1,true,tripadvisor.com
33,Goiabeiras Shopping,shopping,Cuiabá,Duque de Caxias,Av. Miguel Sutil,,3000,"Shopping mais bem avaliado de Cuiabá no TripAdvisor, com marcas nacionais, Cinemark, gastronomia e eventos.",goiabeirasshopping,https://www.goiabeirasshopping.com.br,https://maps.google.com/?q=Goiabeiras+Shopping+Cuiabá,1,true,goiabeirasshopping.com.br
34,Shopping 3 Américas,shopping,Cuiabá,Boa Esperança,Próximo à UFMT,,3000,"O shopping mais cuiabano da cidade, ao lado da UFMT, com Cineflix, lojas, praça de alimentação e eventos culturais com elementos do Pantanal.",shopping3americas,https://www.shopping3americas.com.br,https://maps.google.com/?q=Shopping+3+Américas+Cuiabá,2,true,shopping3americas.com.br
35,Shopping Popular Cuiabá,shopping,Cuiabá,Dom Aquino,Av. Beira Rio,,2000,"Centro comercial popular com foco em comércio acessível, funcionando de segunda a sábado.",shoppingpopularcuiaba,https://www.shoppingpopularcuiaba.com.br,https://maps.google.com/?q=Shopping+Popular+Cuiabá,3,true,shoppingpopularcuiaba.com.br
36,Cinépolis Shopping Estação,cinema,Cuiabá,Jardim Leblon,"Shopping Estação Cuiabá - Av. Miguel Sutil, 9300",78040-365,1500,"Complexo de cinema com salas tradicionais e VIP, dublado e legendado, dentro do Shopping Estação.",cinepolisbrasil,https://www.cinepolis.com.br,https://maps.google.com/?q=Cinépolis+Shopping+Estação+Cuiabá,2,true,cinepolis.com.br
37,Cinemark Goiabeiras,cinema,Cuiabá,Duque de Caxias,Goiabeiras Shopping - Av. Miguel Sutil,,1200,Complexo de cinema Cinemark dentro do Goiabeiras Shopping com múltiplas salas e tecnologia de ponta.,cinemark,https://www.cinemark.com.br,https://maps.google.com/?q=Cinemark+Goiabeiras+Shopping+Cuiabá,2,true,cinemark.com.br
38,Cine Araujo Pantanal Shopping,cinema,Cuiabá,Jardim Aclimação,Pantanal Shopping,,1000,Cinema dentro do Pantanal Shopping com salas modernas e programação atualizada.,cinearaujo,,https://maps.google.com/?q=Cine+Araujo+Pantanal+Shopping+Cuiabá,2,true,cinema10.com.br
39,Cineflix Shopping 3 Américas,cinema,Cuiabá,Boa Esperança,Shopping 3 Américas - Próximo à UFMT,,800,Cinema dentro do Shopping 3 Américas com ingressos disponíveis online.,cineflix,https://vendaonline.cineflix.com.br/cinema/CGB,https://maps.google.com/?q=Cineflix+Shopping+3+Américas+Cuiabá,3,true,cineflix.com.br
40,Praça Popular,espaco_festival,Cuiabá,Popular,Rua Sen. Vilas Bôas / Av. Isaac Póvoas,,5000,"Principal polo de vida noturna de Cuiabá, reunindo bares, restaurantes e casas de show com música ao vivo todos os dias.",,,https://maps.google.com/?q=Praça+Popular+Cuiabá,1,true,starlis.com.br
41,Bar 44,bar_musical,Cuiabá,,,,150,Bar com programação musical e ambiente descontraído.,bar44cuiaba,,,3,true,facebook.com/bar44cuiaba
42,Várzea Grande Shopping,shopping,Várzea Grande,Várzea Grande (frente ao aeroporto),Em frente ao Aeroporto Marechal Rondon,,5000,"Primeiro complexo multiuso de MT, em frente ao aeroporto, com lojas, gastronomia, cinema e eventos.",varzeagrandeshopping,https://varzeagrandeshopping.com.br,https://maps.google.com/?q=Várzea+Grande+Shopping,1,true,varzeagrandeshopping.com.br
43,Pampulha Show Bar,casa_show,Várzea Grande,Centro,"Av. Couto Magalhães, S/N",,500,Casa de shows em Várzea Grande com programação de música ao vivo e eventos.,,,https://maps.google.com/?q=Pampulha+Show+Bar+Várzea+Grande,3,true,encontravarzeagrande.com.br
44,Casa de Show D Paula Club,casa_noturna,Várzea Grande,,"R. Governador Pedro Pedrossian, 720",,400,Casa de shows e baladas em Várzea Grande.,,,https://maps.google.com/?q=D+Paula+Club+Várzea+Grande,3,true,encontravarzeagrande.com.br
45,Galpão Casa de Show,casa_show,Várzea Grande,,,,1000,"Espaço para shows, baladas e eventos em Várzea Grande.",,,https://maps.google.com/?q=Galpão+Casa+de+Show+Várzea+Grande,3,true,varzeagrande.net.br
46,Praça de Eventos de Chapada dos Guimarães,espaco_festival,Chapada dos Guimarães,Centro,Centro de Chapada dos Guimarães,,10000,"Principal palco do Festival de Inverno de Chapada dos Guimarães, maior evento cultural do Centro-Oeste brasileiro, com mais de 80 atrações gratuitas.",,https://www.festivaldeinvernochapada.com.br,https://maps.google.com/?q=Praça+de+Eventos+Chapada+dos+Guimarães,1,true,festivaldeinvernochapada.com.br
47,Praça Dom Wunibaldo,espaco_festival,Chapada dos Guimarães,Centro,Centro de Chapada dos Guimarães,,3000,"Palco complementar do Festival de Inverno, recebendo atrações regionais e nacionais.",,,https://maps.google.com/?q=Praça+Dom+Wunibaldo+Chapada+dos+Guimarães,2,true,chapadadosguimaraes.mt.gov.br
48,Parque de Exposições Exposul,arena_eventos,Rondonópolis,,Parque de Exposições de Rondonópolis,,20000,"Maior parque agropecuário do interior de MT, com mais de 500 mil m², arena de rodeios e shows para 20 mil pessoas. Sede da Exposul.",,,https://maps.google.com/?q=Parque+Exposições+Exposul+Rondonópolis,1,true,rondonopolis.mt.gov.br
49,Casario,centro_cultural,Rondonópolis,Centro,Rua XV de Novembro,,500,"Complexo de 24 casas de adobe e alvenaria estilo anos 40, patrimônio histórico e cultural de Rondonópolis com espaços para arte e eventos.",,,https://maps.google.com/?q=Casario+Rondonópolis+MT,2,true,rondonopolis.mt.gov.br
50,Jonas Music Hall,casa_show,Rondonópolis,,,,1500,"Principal casa de shows de Rondonópolis, recebendo artistas nacionais e regionais.",jonasmusicbar,,https://maps.google.com/?q=Jonas+Music+Hall+Rondonópolis,2,true,facebook.com/jonasmusicbar
51,New Garden Lounge,casa_noturna,Rondonópolis,,"Av. Lions Internacional, 171",,800,Casa noturna e lounge com eventos e shows em Rondonópolis.,newgardenroo,,https://maps.google.com/?q=New+Garden+Lounge+Rondonópolis,3,true,instagram.com/newgardenroo
52,Avenue Rondonópolis,casa_noturna,Rondonópolis,,,,1000,Casa de entretenimento com foco em funk e shows ao vivo.,,https://avenueroo.com.br,https://maps.google.com/?q=Avenue+Rondonópolis,3,true,avenueroo.com.br
53,212 Lounge,casa_noturna,Rondonópolis,,,,600,Casa noturna e lounge com shows nacionais em Rondonópolis.,,,https://maps.google.com/?q=212+Lounge+Rondonópolis,3,true,baladapp.com.br
54,Espaço de Arte Tânia Pardo,centro_cultural,Rondonópolis,Centro,"Rua XV de Novembro, 1.111 - Casario Box 19",,100,Espaço dedicado a exposições de arte e eventos culturais dentro do complexo Casario.,,,https://maps.google.com/?q=Espaço+Arte+Tânia+Pardo+Rondonópolis,3,true,rondonopolis.mt.gov.br
55,Parque de Exposições de Sinop,arena_eventos,Sinop,,,,15000,"Principal espaço para eventos agropecuários, shows e feiras de Sinop, no norte de Mato Grosso.",,,https://maps.google.com/?q=Parque+Exposições+Sinop+MT,2,true,sinop.mt.gov.br
56,Parque de Exposições de Tangará da Serra,arena_eventos,Tangará da Serra,,,,10000,"Espaço para feiras agropecuárias, rodeios e shows nacionais em Tangará da Serra.",,,https://maps.google.com/?q=Parque+Exposições+Tangará+da+Serra+MT,2,true,descubramatogrosso.com.br
57,Parque de Exposições de Sorriso,arena_eventos,Sorriso,,,,10000,"Espaço para eventos agropecuários, feiras e shows no coração do agronegócio de MT.",,,https://maps.google.com/?q=Parque+Exposições+Sorriso+MT,2,true,descubramatogrosso.com.br
58,Parque de Exposições de Lucas do Rio Verde,arena_eventos,Lucas do Rio Verde,,,,8000,Espaço para feiras agropecuárias e shows em Lucas do Rio Verde.,,,https://maps.google.com/?q=Parque+Exposições+Lucas+do+Rio+Verde+MT,2,true,descubramatogrosso.com.br
59,Parque de Exposições de Primavera do Leste,arena_eventos,Primavera do Leste,,,,8000,"Espaço para feiras, exposições agropecuárias e shows regionais.",,,https://maps.google.com/?q=Parque+Exposições+Primavera+do+Leste+MT,3,true,descubramatogrosso.com.br
60,Parque de Exposições de Cáceres,arena_eventos,Cáceres,,,,8000,"Espaço para feiras agropecuárias, Festival Internacional de Pesca e shows em Cáceres.",,,https://maps.google.com/?q=Parque+Exposições+Cáceres+MT,2,true,descubramatogrosso.com.br
61,Parque de Exposições de Barra do Garças,arena_eventos,Barra do Garças,,,,8000,"Espaço para feiras, exposições e shows na região do Araguaia.",,,https://maps.google.com/?q=Parque+Exposições+Barra+do+Garças+MT,3,true,descubramatogrosso.com.br
62,Parque de Exposições de Alta Floresta,arena_eventos,Alta Floresta,,,,5000,Espaço para eventos agropecuários e shows no extremo norte de Mato Grosso.,,,https://maps.google.com/?q=Parque+Exposições+Alta+Floresta+MT,3,true,descubramatogrosso.com.br
63,Sesc Rondonópolis,centro_cultural,Rondonópolis,,,,800,"Unidade do Sesc com programação cultural, teatro, cinema e atividades artísticas.",sescmt,https://www.sescmt.com.br,https://maps.google.com/?q=Sesc+Rondonópolis+MT,2,true,sescmt.com.br
64,Sesc Sinop,centro_cultural,Sinop,,,,600,"Unidade do Sesc com atividades culturais, esportivas e de lazer no norte de MT.",sescmt,https://www.sescmt.com.br,https://maps.google.com/?q=Sesc+Sinop+MT,2,true,sescmt.com.br
65,Sesc Cáceres,centro_cultural,Cáceres,,,,500,Unidade do Sesc com programação cultural e eventos em Cáceres.,sescmt,https://www.sescmt.com.br,https://maps.google.com/?q=Sesc+Cáceres+MT,3,true,sescmt.com.br
66,Espaço Tulipas,centro_convencoes,Rondonópolis,Parque das Nações,Av. Francisco de Almeida Lima - Chácara Residencial Parque das Nações,78734-600,1000,"Espaço multiuso para eventos, festas e conferências em Rondonópolis.",,,https://maps.google.com/?q=Espaço+Tulipas+Rondonópolis,3,true,rondonopolis.skylinq.com.br
67,Sala Anderson Flores (Cine Teatro Cuiabá),teatro,Cuiabá,Centro,"Av. Presidente Getúlio Vargas, S/N (dentro do Cine Teatro)",,80,"Sala menor e intimista dentro do Cine Teatro Cuiabá, ideal para apresentações de teatro e palestras.",cineteatrocba,https://cineteatrocuiaba.org.br,https://maps.google.com/?q=Cine+Teatro+Cuiabá,3,true,cineteatrocuiaba.org.br
68,Foyer Café (Cine Teatro Cuiabá),centro_cultural,Cuiabá,Centro,"Av. Presidente Getúlio Vargas, S/N (dentro do Cine Teatro)",,50,"Cafeteria cultural dentro do Cine Teatro Cuiabá, espaço de convivência artística.",cineteatrocba,https://cineteatrocuiaba.org.br,https://maps.google.com/?q=Cine+Teatro+Cuiabá,3,true,cineteatrocuiaba.org.br
69,MT Escola de Teatro,centro_cultural,Cuiabá,Centro,"Av. Presidente Getúlio Vargas, S/N (dentro do Cine Teatro)",,100,"Escola de teatro gratuita que funciona dentro do Cine Teatro, oferecendo curso superior de Tecnologia em Teatro.",cineteatrocba,https://cineteatrocuiaba.org.br,https://maps.google.com/?q=Cine+Teatro+Cuiabá,3,true,cineteatrocuiaba.org.br
70,Bambuzeria (Festival de Chapada),espaco_festival,Chapada dos Guimarães,Centro,Centro de Chapada dos Guimarães,,500,Espaço alternativo utilizado durante o Festival de Inverno para apresentações intimistas e oficinas.,,https://www.festivaldeinvernochapada.com.br,https://maps.google.com/?q=Bambuzeria+Chapada+dos+Guimarães,3,true,festivaldeinvernochapada.com.br
71,Sala da Memória (Festival de Chapada),centro_cultural,Chapada dos Guimarães,Centro,Centro de Chapada dos Guimarães,,200,Espaço dedicado a exposições de memória cultural e artística durante o Festival de Inverno.,,https://www.festivaldeinvernochapada.com.br,,3,true,festivaldeinvernochapada.com.br
72,Cais de Rondonópolis,espaco_festival,Rondonópolis,,Margem do Rio Vermelho,,5000,Espaço revitalizado à margem do rio com área coberta para shows e eventos culturais.,,,https://maps.google.com/?q=Cais+Rondonópolis+MT,2,true,rondonopolis.mt.gov.br
73,Sebrae MT - Cuiabá,centro_convencoes,Cuiabá,Centro Político Administrativo,Av. Historiador Rubens de Mendonça,,500,"Sede do Sebrae em MT com auditório e espaço para eventos empresariais, feiras e workshops.",sebraemt,https://www.sebrae.com.br/sites/PortalSebrae/ufs/mt,https://maps.google.com/?q=Sebrae+MT+Cuiabá,2,true,sebrae.com.br
74,Assembleia Legislativa de MT,centro_convencoes,Cuiabá,Centro Político Administrativo,Centro Político Administrativo,,800,"Plenário e espaços utilizados para eventos institucionais, palestras e audiências públicas.",,https://www.al.mt.gov.br,https://maps.google.com/?q=Assembleia+Legislativa+MT+Cuiabá,3,true,al.mt.gov.br
75,Prefeitura de Cuiabá - Palácio Alencastro,centro_cultural,Cuiabá,Centro,"Praça Alencastro, Centro",,300,Sede da prefeitura com espaço para eventos institucionais e culturais na praça central de Cuiabá.,,https://www.cuiaba.mt.gov.br,https://maps.google.com/?q=Palácio+Alencastro+Cuiabá,3,true,cuiaba.mt.gov.br
76,Museu Rondon,museu,Cuiabá,Boa Esperança,Campus UFMT - Av. Fernando Corrêa da Costa,,200,"Museu etnológico e arqueológico dentro do campus da UFMT, com acervo sobre povos indígenas do Brasil Central.",,,https://maps.google.com/?q=Museu+Rondon+UFMT+Cuiabá,3,true,ufmt.br
77,Museu de Arte e Cultura Popular (MACP),museu,Cuiabá,Boa Esperança,Campus UFMT - Av. Fernando Corrêa da Costa,,200,Museu dentro da UFMT dedicado à arte e cultura popular de Mato Grosso.,,,https://maps.google.com/?q=Museu+Arte+Cultura+Popular+UFMT+Cuiabá,3,true,ufmt.br
78,Igreja Nossa Senhora do Rosário e São Benedito,centro_cultural,Cuiabá,Centro,"Praça do Rosário, Centro",,500,"Igreja histórica que recebe festas religiosas tradicionais como a Festa de São Benedito, importante evento cultural de Cuiabá.",,,https://maps.google.com/?q=Igreja+Rosário+São+Benedito+Cuiabá,3,true,almanaquecuiaba.com.br
79,Mercado do Porto,centro_cultural,Cuiabá,Porto,Av. Manoel José de Arruda - Porto,,500,"Mercado histórico às margens do Rio Cuiabá com gastronomia regional, artesanato e eventos culturais.",,,https://maps.google.com/?q=Mercado+do+Porto+Cuiabá,2,true,almanaquecuiaba.com.br
80,Casa do Artesão,centro_cultural,Cuiabá,Centro,Rua 13 de Junho - Centro,,100,"Espaço de exposição e venda de artesanato mato-grossense, com eventos culturais e feiras temáticas.",,,https://maps.google.com/?q=Casa+do+Artesão+Cuiabá,3,true,almanaquecuiaba.com.br`;

function parseCSV(csv: string): Location[] {
  const lines = csv.split('\n');
  return lines.map(line => {
    // Simple CSV parser that handles quoted fields
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current);

    const cidade = parts[3];
    const baseCoord = cityCoords[cidade] || [-15.601, -56.097];
    // Add jitter
    const jitter = () => (Math.random() - 0.5) * 0.02;
    const coords: [number, number] = [baseCoord[0] + jitter(), baseCoord[1] + jitter()];

    return {
      id: parseInt(parts[0]),
      nome: parts[1],
      tipo: parts[2],
      cidade: parts[3],
      bairro: parts[4],
      endereco: parts[5],
      cep: parts[6],
      capacidade: parseInt(parts[7]) || 0,
      descricao_curta: parts[8],
      instagram: parts[9],
      site: parts[10],
      google_maps: parts[11],
      nivel_relevancia: parseInt(parts[12]),
      status_ativo: parts[13] === 'true',
      fonte_verificacao: parts[14],
      coordinates: coords
    };
  });
}

export const locations = parseCSV(rawData);

export const tipoLabels: Record<string, string> = {
  arena_eventos: "Arena de Eventos",
  parque_eventos: "Parque de Eventos",
  centro_convencoes: "Centro de Convenções",
  casa_show: "Casa de Show",
  centro_cultural: "Centro Cultural",
  teatro: "Teatro",
  bar_musical: "Bar Musical",
  museu: "Museu",
  shopping: "Shopping",
  cinema: "Cinema",
  espaco_festival: "Espaço de Festival",
  casa_noturna: "Casa Noturna"
};
