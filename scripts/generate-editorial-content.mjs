import fs from "node:fs";

const input = JSON.parse(fs.readFileSync("data/reference-site.json", "utf8"));
const profiles = {
  "gladysvale-south-africas-2m-year-hominin-cave": {
    hook: "Gladysvale is a limestone cave system where fossil-bearing breccia, ancient sediments and the remains of animals meet in one difficult archive.",
    record: "The important evidence is not a single spectacular object. It is the relationship between bones, sediment, cave walls and the wider Cradle of Humankind landscape.",
    method: "Researchers have to combine geological observation, fossil comparison and dating methods before assigning an age or evolutionary meaning to a find.",
    caution: "The phrase “two million years” is a broad chronological guide, not a promise that every layer or specimen belongs to exactly the same moment.",
    takeaway: "Gladysvale matters because it shows how human evolution is reconstructed from overlapping traces rather than from one complete story."
  },
  "gondolin-south-africas-sabertooth-den": {
    hook: "Gondolin is a fossil locality in the Cradle of Humankind whose value lies in the ancient animal community preserved around the hominin story.",
    record: "Sabre-toothed predators are part of the attraction, but the wider assemblage is just as revealing: prey, competitors and changing habitats all leave clues in teeth and bones.",
    method: "Palaeontologists compare anatomy, wear, breakage and species associations to ask how animals lived, fed and moved through the Pleistocene landscape.",
    caution: "Calling Gondolin a “den” is a vivid shorthand, not proof that every fossil was accumulated by one predator or in one event.",
    takeaway: "The site shifts attention from a lone predator to the ecological network in which early hominins also had to survive."
  },
  "swartkrans-south-africas-homo-erectus-fire-use": {
    hook: "Swartkrans brings together cave sediments, hominin fossils, stone tools and the long-running question of how early people used fire.",
    record: "The strongest story comes from layers read together: burned material, tool evidence, animal remains and the geological history of the cave.",
    method: "A careful interpretation separates evidence of burning from evidence of controlled fire, then tests both against the age and condition of the deposit.",
    caution: "A darkened fragment or ash-like material cannot, on its own, prove a campfire or a particular hominin author.",
    takeaway: "Swartkrans is valuable precisely because it makes a simple question—who used fire, and when?—scientifically demanding."
  },
  "drimolen-south-africas-earliest-homo": {
    hook: "Drimolen is a fossil site where the diversity of early hominins can be examined through remains found in a tightly interpreted geological setting.",
    record: "The site contributes fossils of ancient hominins alongside other animals, allowing researchers to compare anatomy with the environments in which those populations lived.",
    method: "The work depends on measurements, species comparisons and the position of each specimen in the deposit rather than on a single label such as “earliest Homo.”",
    caution: "Early human evolution was branching and uneven, so a new fossil does not automatically replace every existing explanation.",
    takeaway: "Drimolen is a reminder that the genus Homo emerged within a wider community of hominins, not on an isolated ladder of progress."
  },
  "rising-star-cave-south-africas-homo-naledi-system": {
    hook: "Rising Star is both a fossil site and a logistical challenge: a deep cave system whose passages shaped what could be found and how it could be interpreted.",
    record: "The discovery of Homo naledi remains changed the conversation because the fossils were numerous, distinctive and recovered from spaces that demanded careful access.",
    method: "Taphonomy, mapping, excavation records and anatomical comparison work together to test how bodies or bones entered the cave.",
    caution: "The cave’s drama should not outrun the evidence; the route of deposition and the behaviour behind it remain questions to be tested.",
    takeaway: "Rising Star shows that archaeology is also an investigation of space, movement and preservation—not only an inventory of bones."
  },
  "cradle-of-humankind-unesco-sites-2026-new-finds": {
    hook: "The Cradle of Humankind is best understood as a connected landscape of caves, quarries, laboratories and protected heritage sites.",
    record: "New finds become meaningful when they are placed beside older discoveries from neighbouring localities, creating a longer record of hominin life and environmental change.",
    method: "Researchers combine excavation, geochronology, palaeontology and conservation work, while heritage teams protect the physical context that makes future research possible.",
    caution: "A UNESCO designation recognises outstanding heritage value; it does not turn every new claim from the region into settled science.",
    takeaway: "The real discovery is the network itself: many imperfect sites can answer more than one famous cave standing alone."
  },
  "magaliesberg-caves-south-africas-san-rock-art": {
    hook: "The Magaliesberg is a mountain landscape of ridges, shelters and routes where rock art is part of a much larger human history.",
    record: "Painted surfaces sit alongside stone tools, hearths and the physical shape of the shelters, giving researchers several ways to ask how people used the mountains.",
    method: "Pigment study, superimposition, shelter recording and landscape archaeology help separate what was painted, when it was added and how it may have been encountered.",
    caution: "Rock art should not be reduced to a simple picture caption or assigned to an artist’s intention without cultural and archaeological context.",
    takeaway: "The Magaliesberg matters because the landscape is not just a backdrop to the images; it is part of their meaning and survival."
  },
  "oakhurst-rockshelter-south-africas-wilton-culture": {
    hook: "Oakhurst Rockshelter offers a long view of Later Stone Age life near George, where repeated visits left tools, food remains and human traces in the same shelter.",
    record: "The Wilton tradition is visible through small stone tools, but the wider record also includes changes in subsistence, movement and treatment of the dead.",
    method: "Layer-by-layer excavation lets archaeologists compare technologies and occupations without treating the shelter as if it belonged to one unchanged community.",
    caution: "A cultural label is a research tool, not a complete description of the people who occupied the site.",
    takeaway: "Oakhurst is strongest as a sequence: a place where small changes accumulate into a history of adaptation."
  },
  "nelson-bay-cave-south-africas-micro-lithics": {
    hook: "Nelson Bay Cave sits on the Robberg Peninsula, where the archaeology of a coastal cave records both technology and a changing relationship with the sea.",
    record: "Microliths are small, but their production carries information about planning, repair and the kinds of tasks people expected to perform.",
    method: "Archaeologists read tiny stone pieces alongside animal remains, marine resources, sediment and the cave’s changing position in the coastal landscape.",
    caution: "The presence of a tool type does not name its maker or explain every activity that happened in the cave.",
    takeaway: "Nelson Bay shows how a small artefact can open a large question about mobility, coastlines and everyday decision-making."
  },
  "byneskranskop-south-africas-pastoralist-transition": {
    hook: "Byneskranskop 1 is useful for thinking about transition: how hunter-gatherer lifeways and livestock economies met in the Western Cape.",
    record: "The archaeological signal is a mixture of cave occupation, Later Stone Age technology and clues about changing relationships between people, animals and land.",
    method: "Researchers compare faunal remains, artefact production, dates and spatial patterning rather than treating the arrival of pastoralism as a single event.",
    caution: "Cultural change is rarely a clean replacement. Contact, exchange and selective adoption can leave overlapping signatures.",
    takeaway: "Byneskranskop makes the transition visible as negotiation, not a simple switch from one way of life to another."
  },
  "die-kelders-south-africas-middle-stone-age-cave": {
    hook: "Die Kelders overlooks Walker Bay and preserves a coastal record that reaches into the Middle Stone Age.",
    record: "The cave’s importance comes from the combination of human occupation, shoreline resources and sediments that record how people used a changing coast.",
    method: "Shell, stone, pigment and sediment are read together, with careful attention to whether an object stayed where it was deposited.",
    caution: "Coastal archaeology is vulnerable to later disturbance, changing shorelines and assumptions that a single find represents an entire community.",
    takeaway: "Die Kelders places early human behaviour inside an active coastal environment rather than treating the cave as an isolated room."
  },
  "peers-cave-south-africas-15000-year-burials": {
    hook: "Peers Cave is a Later Stone Age site where burial evidence brings questions of care, memory and archaeological context into focus.",
    record: "Human remains are not just biological specimens; their position, association with sediment and relationship to the shelter can reveal how a community handled the dead.",
    method: "Osteology, stratigraphy and taphonomic study help distinguish deliberate burial from later movement or disturbance.",
    caution: "A burial cannot be translated directly into a complete belief system, especially when excavation records are uneven or old.",
    takeaway: "Peers Cave matters because it asks how much social history can be recovered from the way a body was placed and preserved."
  },
  "matjes-river-rockshelter-south-africas-shellfish-midden": {
    hook: "Matjes River Rockshelter records a coastal economy through the remains people left behind after collecting and eating marine resources.",
    record: "A shell midden is more than a pile of food waste: species, breakage, burning and position can reveal choices made over many visits.",
    method: "Archaeologists combine shell analysis with stone tools, animal remains and sediment to examine seasonality, mobility and shoreline use.",
    caution: "A midden reflects selected activities, not every part of life, and later weathering can change the signal.",
    takeaway: "Matjes River gives everyday coastal decisions the same historical weight as more dramatic artefacts."
  },
  "elands-bay-cave-south-africas-2000-year-sequence": {
    hook: "Elands Bay Cave is valuable because its long sequence connects Middle Stone Age and Later Stone Age occupation on the Western Cape coast.",
    record: "Different layers preserve changing technologies, food choices and environmental responses, making the cave a record of continuity as well as change.",
    method: "Stratigraphy, dating, faunal study and artefact analysis allow researchers to place each occupation within a longer coastal history.",
    caution: "A long sequence is not an unbroken diary; gaps, erosion and disturbance can separate the evidence from the lives that created it.",
    takeaway: "Elands Bay rewards slow reading: the significance lies in the transitions between layers."
  },
  "faraone-shelter-south-africas-rock-engravings": {
    hook: "Faraone Shelter belongs to a tradition of southern African rock engravings made by pecking, cutting or abrading designs into stone.",
    record: "The marks are part of a place, not a portable gallery. Their scale, surface and relation to nearby routes affect how they can be understood.",
    method: "Recording technique, weathering, superimposition and comparison with other engraved landscapes help establish how the images were made and revisited.",
    caution: "An animal outline or geometric mark does not carry a universal meaning that can be read without cultural context.",
    takeaway: "Faraone shows why rock art research begins with looking closely at the surface before making large interpretations."
  },
  "barkly-east-rock-art-south-africas-freehand-paintings": {
    hook: "Barkly East places freehand rock paintings within a highland landscape of sandstone, river valleys and open grassland.",
    record: "The paintings are strongest when read alongside the shelters themselves, where light, movement and visibility shaped how images were encountered.",
    method: "Pigment recording, image layering and landscape survey help researchers distinguish phases of painting without treating every figure as a single scene.",
    caution: "The term “freehand” describes a technique, not a shortcut to the identity, date or meaning of the artist.",
    takeaway: "Barkly East reminds us that rock art survives through both human intention and the geology of the surface."
  },
  "wildebeestkuil-south-africas-game-drive-traps": {
    hook: "Wildebeestkuil near Kimberley is known for engraved rock surfaces and for the heritage work that makes Indigenous history visible to visitors.",
    record: "The site’s game-drive associations point toward how people shaped movement across a landscape, while the engravings preserve a different layer of cultural expression.",
    method: "Archaeology, oral history, site interpretation and conservation need to work together when a place is both a research locality and a living heritage centre.",
    caution: "A heritage label should not collapse diverse Indigenous histories into one timeless hunting story.",
    takeaway: "Wildebeestkuil is important because interpretation is part of preservation: the way a site is explained affects what visitors learn from it."
  },
  "drakensberg-san-art-south-africas-4000-year-scenes": {
    hook: "The Drakensberg holds one of southern Africa’s richest concentrations of San rock art, spread across shelters beneath dramatic sandstone cliffs.",
    record: "Animals, human figures and composite scenes create a visual archive, but the images are also tied to routes, water, shelter and mountain weather.",
    method: "Researchers compare pigment, layering, subject matter and site position while working with descendant communities and conservation teams.",
    caution: "A painted scene is not automatically a literal record of an event; symbolism, performance and memory can overlap.",
    takeaway: "Drakensberg art matters because it is both image and place—a record that cannot be separated from the mountains that hold it."
  },
  "giants-castle-south-africas-eland-paintings": {
    hook: "Giant’s Castle is a mountain archive where painted eland and human figures sit within a wider network of San shelters in KwaZulu-Natal.",
    record: "The eland is visually prominent, but the surrounding composition, shelter access and repeated layers are equally important to interpretation.",
    method: "Archaeologists and heritage workers document pigments, superimposition and spatial context while protecting fragile painted surfaces.",
    caution: "It is safer to speak about recurring motifs and cultural interpretation than to assign one fixed meaning to every eland image.",
    takeaway: "Giant’s Castle teaches a useful lesson: an iconic image gains depth when the less famous traces around it are also recorded."
  },
  "kamberg-rock-art-south-africas-shaman-scenes": {
    hook: "Kamberg is known for San rock art and for scenes that have often been discussed through the language of trance, healing and spiritual practice.",
    record: "Human-animal figures and unusual body forms invite interpretation, but the evidence also includes pigment, layering and the physical setting of the shelters.",
    method: "A responsible reading combines visual analysis with ethnography, Indigenous knowledge and caution about projecting modern categories onto older images.",
    caution: "The word “shaman” can be useful in some discussions but can also flatten distinct traditions and living communities.",
    takeaway: "Kamberg is most interesting when it opens questions about experience and belief without pretending that every answer is recoverable."
  },
  "main-caves-south-africas-battle-paintings": {
    hook: "Main Caves in the Giant’s Castle area contains San paintings that have sometimes been described as scenes of conflict or battle.",
    record: "Figures, weapons and movement can suggest an event, yet the image surface alone cannot settle whether a scene is historical, symbolic or ceremonial.",
    method: "Researchers compare composition, pigment layers, nearby motifs and regional traditions while separating visual description from interpretation.",
    caution: "A modern narrative can be imposed too quickly on images that were created within a different social and spiritual world.",
    takeaway: "Main Caves is a lesson in archaeological humility: describing what is visible is only the first step."
  },
  "didima-south-africas-mythological-figures": {
    hook: "Didima’s rock art includes figures whose human and animal qualities have encouraged discussion of mythology and transformation.",
    record: "The images belong to shelters in a wider Drakensberg landscape, where movement through the mountains and repeated painting shaped the record.",
    method: "Conservation, image documentation and comparison with San knowledge help build interpretations without separating the art from its cultural inheritance.",
    caution: "“Mythological” is an interpretive word, not a label that proves what an ancient artist intended.",
    takeaway: "Didima matters because it keeps the boundary between image, story and ritual open for careful research."
  },
  "injisuthi-south-africas-procession-friezes": {
    hook: "Injisuthi is a Drakensberg landscape where long arrangements of painted figures can create an impression of movement across the shelter wall.",
    record: "Procession-like compositions are compelling because sequence and spacing matter, but the order in which a modern viewer sees figures may not match the original experience.",
    method: "Researchers document panels, pigment overlap, shelter orientation and sightlines to understand how images accumulated.",
    caution: "A frieze is a description of visual arrangement, not proof that the figures represent one literal procession.",
    takeaway: "Injisuthi invites us to study rock art as choreography: meaning may live in relation, not in isolated figures."
  },
  "sehonghong-shelter-lesothos-4000-year-rock-art": {
    hook: "Sehonghong Shelter is part of Lesotho’s highland record of occupation, technology and rock art across a demanding mountain environment.",
    record: "The shelter brings together painted surfaces, stone tools and evidence of repeated visits, showing how people used protected spaces above the lowlands.",
    method: "Archaeologists compare layers, artefact production, pigment and environmental evidence to track how highland lifeways changed.",
    caution: "A four-thousand-year reference identifies a broad horizon, not a single date for every image or occupation.",
    takeaway: "Sehonghong shows that highland archaeology is a story of movement, seasonal knowledge and selective return."
  },
  "metolong-dam-sites-lesothos-iron-age-villages": {
    hook: "The Metolong Dam investigations show why archaeology before construction is essential: development can threaten sites while also creating the resources to study them.",
    record: "Surveys and excavations in the project area documented Iron Age settlement traces and the material patterns of village life in western Lesotho.",
    method: "Rescue archaeology combines mapping, excavation, sampling and reporting before a reservoir changes the landscape.",
    caution: "A project archive is shaped by time and access, so it records what could be investigated rather than everything that once existed.",
    takeaway: "Metolong is a case study in mitigation: good planning can turn unavoidable landscape change into lasting knowledge."
  },
  "liphofung-cave-lesothos-san-paintings": {
    hook: "Liphofung Cave is a northern Lesotho shelter where San paintings meet a landscape of routes, water and highland refuge.",
    record: "The images are important not only for what they depict but for the way the cave preserves an encounter between art, rock and movement through the region.",
    method: "Site recording, pigment conservation and community-based interpretation help protect the paintings while keeping their cultural context visible.",
    caution: "The paintings should not be treated as anonymous decoration or as a complete account of San history.",
    takeaway: "Liphofung is best approached as a living heritage place whose archaeological value includes responsibility to the communities connected to it."
  },
  "quthing-district-lesothos-rock-engravings": {
    hook: "Quthing District’s valleys and rocky slopes form a highland setting in which engraved surfaces preserve traces of repeated human attention.",
    record: "Pecked and abraded designs are inseparable from the stone on which they were made, the paths around them and the visibility of the wider valley.",
    method: "Researchers document technique, weathering, motifs and location, then compare the record with other Lesotho engraving traditions.",
    caution: "An engraving’s age and meaning cannot be read from appearance alone; surface exposure and later damage complicate both questions.",
    takeaway: "Quthing demonstrates that rock art is a geography of marks, not a collection of isolated symbols."
  },
  "moyeni-rock-art-lesothos-hunter-scenes": {
    hook: "Moyeni is associated with a recurring subject in southern African rock-art research: people and animals arranged around the idea of hunting.",
    record: "The images can preserve information about movement, equipment and visual storytelling, while still leaving the event itself open to interpretation.",
    method: "Researchers compare figures, composition, pigment and landscape position, and they distinguish description from the stories viewers want to tell.",
    caution: "A “hunter scene” is a useful starting phrase, not proof that an image records one hunt or one historical episode.",
    takeaway: "Moyeni encourages a slower kind of looking—one that values ambiguity as part of the evidence."
  },
  "maseru-district-shelters-lesothos-pastoral-art": {
    hook: "Maseru District sits at a meeting point of lowland routes and highland approaches, a setting where different economies and artistic traditions could overlap.",
    record: "Shelter art associated with pastoral lifeways belongs beside evidence for earlier hunting, gathering and settlement rather than being placed in a separate world.",
    method: "Archaeologists use motif study, landscape survey, dating and material evidence to examine how people moved through and represented the district.",
    caution: "The label “pastoral art” should not erase older traditions or assume that an image maps neatly onto one economic identity.",
    takeaway: "Maseru’s shelters matter because they make cultural transition visible as layering—on the wall and in the wider landscape."
  },
  "thaba-bosiu-lesothos-moshoeshoe-fortress": {
    hook: "Thaba Bosiu is a flat-topped sandstone plateau whose cliffs, routes and water sources helped shape the history of the Basotho kingdom.",
    record: "Its association with Moshoeshoe I gives the place a strong historical identity, while the plateau itself preserves the spatial logic of refuge, settlement and power.",
    method: "Archaeology, oral history, documentary sources and conservation work need to be read together at a site where memory is part of the evidence.",
    caution: "A fortress is not only a battlefield. Daily life, diplomacy, movement and community building also shaped Thaba Bosiu’s significance.",
    takeaway: "Thaba Bosiu remains important because its historical meaning is both material and remembered, anchored in a landscape that still organises national memory."
  }
};

const openers = [
  (article, profile) => article.title + " is best read as a question about evidence. " + profile.hook,
  (article, profile) => "The most useful way to approach " + article.title + " is to slow down. " + profile.hook,
  (article, profile) => "At first glance, " + article.title + " sounds like a single story. " + profile.hook,
  (article, profile) => "This field note begins with the place behind the headline. " + profile.hook,
  (article, profile) => article.title + " belongs to a landscape where small traces carry long histories. " + profile.hook
];

const editorialContent = input.articles.map((article, index) => {
  const profile = profiles[article.slug];
  if (!profile) throw new Error("Missing editorial profile for " + article.slug);
  const opening = openers[index % openers.length](article, profile);
  const content = [
    opening,
    "The central record is this: " + profile.record + " That distinction matters because archaeological meaning is built from relationships, not from a headline object lifted out of its setting.",
    "To read the site responsibly, researchers need more than a photograph. " + profile.method + " The work is often slow—measuring layers, checking associations and comparing fragments with evidence from nearby places—but that slowness is what keeps an attractive interpretation from becoming a false certainty.",
    "The surrounding landscape adds another layer. A cave, shelter, plateau or painted wall was not a neutral container; it shaped where people moved, what could be preserved and what later researchers are able to see. Comparing this place with nearby sites can reveal whether a pattern is local, regional or part of a much longer tradition.",
    "There is also a limit to what the record can say. " + profile.caution + " The gaps are not failures in the story; they are part of the reason archaeologists publish methods, dates and competing interpretations alongside their conclusions.",
    "Preservation has its own history. Weather, water, later occupation, excavation practice and the movement of objects can all change the archive before it reaches a museum or a database. That is why a strong field note describes uncertainty instead of hiding it behind confident language.",
    "For readers, the wider lesson is simple: " + profile.takeaway + " A field note is not a final verdict. It is an invitation to look again, ask better questions and protect the evidence that future research will need."
  ].join("\n\n");
  const excerpt = content.split(/[.!?]+/)[0].trim() + ".";
  return { slug: article.slug, excerpt, content };
});

fs.writeFileSync("data/editorial-content.json", JSON.stringify({ generatedAt: new Date().toISOString(), articles: editorialContent }, null, 2) + "\n");
