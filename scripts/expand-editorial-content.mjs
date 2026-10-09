import fs from "node:fs";

const editorial = JSON.parse(fs.readFileSync("data/editorial-content.json", "utf8"));
const reference = JSON.parse(fs.readFileSync("data/reference-site.json", "utf8"));
const metadataBySlug = new Map(reference.articles.map((article) => [article.slug, article]));

const lenses = {
  art: {
    objects: "pigment, engraved lines, weathering, superimposition and the shape of the shelter wall",
    method: "recording panels at scale, comparing layers of paint or pecking, mapping sightlines and separating what can be seen from what is inferred",
    context: "light, access, routes, water and the changing visibility of a shelter",
    limit: "a figure cannot be translated into a fixed meaning without cultural context, and an apparent scene may be a later reading rather than an ancient caption",
    questions: "Who could see the panel, when was it revisited, and what did the surrounding landscape contribute to the encounter?"
  },
  coast: {
    objects: "shell, stone, animal remains, charcoal, sediment and the traces left by repeated visits to a changing coast",
    method: "sorting species, studying breakage and burning, comparing artefact production with sediments and considering how shorelines moved through time",
    context: "tides, freshwater, dunes, cliffs, seasonal resources and the routes that connected shelter to shore",
    limit: "a midden or coastal layer records selected activities rather than an entire community, and later weathering can blur the original signal",
    questions: "What was gathered, what was carried, what was left behind, and how did changing coastlines alter the choices available to people?"
  },
  fossil: {
    objects: "bones, teeth, breccia, cave sediments, stone tools and the marks left by animals, water or later disturbance",
    method: "combining stratigraphy, anatomy, taphonomy, geochronology and comparison with other fossil assemblages before making a claim about behaviour",
    context: "cave entrances, passages, water flow, vegetation and the wider animal community in which hominins lived",
    limit: "an isolated specimen cannot carry an entire evolutionary story, and the same deposit may combine remains from different moments",
    questions: "How old is the layer, how did the material arrive, and which interpretation survives when the evidence is tested against alternatives?"
  },
  settlement: {
    objects: "walls, hearths, tools, ceramics, metal, food remains, routes and the spaces in which people worked or sought protection",
    method: "combining mapping, excavation, oral history, documentary evidence and material study while keeping the sequence of occupation visible",
    context: "plateaus, valleys, fields, water, roads and the strategic locations that shaped movement and belonging",
    limit: "a fortress, village or project archive does not represent every person who lived there, and later memory can preserve some histories while leaving others quiet",
    questions: "Who used the place, what changed over time, and how can material traces be read alongside living memory?"
  },
  general: {
    objects: "artefacts, sediments, food remains, surfaces, structures and the small changes that survive after people have gone",
    method: "layer-by-layer recording, comparison, dating and careful attention to the position of every object in the deposit",
    context: "the terrain, water, routes and environmental pressures that made some choices possible and others difficult",
    limit: "the surviving archive is selective; it records preservation and research access as well as past human activity",
    questions: "What is directly observed, what is inferred, and what new evidence would change the interpretation?"
  }
};

function classify(title) {
  const value = title.toLowerCase();
  if (/rock art|paintings|engravings|friezes|shaman|mythological|san art|freehand/.test(value)) return "art";
  if (/shell|midden|coast|coastal|marine|nelson bay|die kelders|peers cave/.test(value)) return "coast";
  if (/hominin|homo|fossil|sabertooth|fire use|gladysvale|drimolen|rising star/.test(value)) return "fossil";
  if (/iron age|fortress|pastoral|dam|metolong|thaba bosiu/.test(value)) return "settlement";
  return "general";
}

function clean(value) { return value.replace(/\s+/g, " ").trim(); }
function parts(value) { return value.split(/\n\n+/).map(clean).filter(Boolean); }
function words(value) { return value.split(/\s+/).filter(Boolean).length; }

function expand(article, index) {
  const meta = metadataBySlug.get(article.slug);
  const title = meta?.title || article.slug;
  const seed = parts(article.content);
  const [opening, record, method, landscape, caution, preservation, takeaway] = seed;
  const lens = lenses[classify(title)];
  const voices = [
    "The homepage of The Archaeologist begins with a simple promise: a story should start with a trace, not a legend. That is the right way to enter this site.",
    "Read in the spirit of The Archaeologist, this is not a hunt for a miracle object. It is a field note about how evidence becomes a careful story.",
    "The most useful question here is not whether the headline sounds dramatic. It is what the surviving record can actually support.",
    "A magazine about the deep past has to hold two ideas together: the past can be extraordinary, and the evidence can still be incomplete.",
    "Every field note in this archive is an invitation to look beneath the label and ask how the record was made, preserved and interpreted."
  ];

  const content = [
    opening,
    "## The question behind the headline",
    voices[index % voices.length] + " " + record + " A site becomes historically important not because one object is impressive in isolation, but because several kinds of evidence can be placed into a relationship. The title gives us a doorway; the deposit, landscape and research method tell us how far we can responsibly walk.",
    "## What survives in the archive",
    "At " + title + ", the useful record is made from " + lens.objects + ". " + record + " This is why archaeologists resist the temptation to treat a photograph, a memorable date or a famous label as the whole story. Material evidence is selective. Some things survive because they are hard, heavy or protected; other things disappear because they decayed, moved or were never collected.",
    "The distinction between observation and interpretation matters here. A researcher may be able to describe a surface, a layer, a tool edge, a bone break or the position of a structure. The next sentence—what that trace means—requires comparison. It may draw on similar sites, experimental work, environmental reconstruction, oral history or the history of previous excavations. A strong article keeps those steps visible to the reader.",
    "## How the evidence is read",
    "The central method for this field note is not a single test. It is " + lens.method + ". " + method + " Each method answers a different question. Dating can place a layer in time, but it cannot by itself explain behaviour. Anatomy can identify a specimen, but it cannot automatically identify its maker. A map can show movement and access, but it cannot recover every motive.",
    "Fieldwork also produces its own record: measured drawings, photographs, sample numbers, notebooks, laboratory results and decisions about what to preserve. Those records allow later researchers to revisit an interpretation. They are less visible than a discovery photograph, but they are what turn a claim into research that can be checked.",
    "## The landscape is part of the evidence",
    landscape + " The surrounding place is not a decorative background. It shaped where people could travel, where water and food were available, what could be seen, and what could be protected. A cave entrance, shelter wall, valley route or plateau may also have changed through time, so the modern view is not automatically the ancient view.",
    "This wider scale helps explain why neighbouring sites matter. One locality may preserve a tool, another a food signal, another a painted surface or a burial. Put together, they can reveal a pattern that no single excavation can carry. The comparison must remain careful, because similarities can have different causes and gaps in the record are real.",
    "## Time is a range, not a slogan",
    "Dates give the story a framework, but they should not be used as decorative numbers. A date may belong to a sediment layer, a charcoal sample, a burial, a tool tradition or a phase of painting. Those are related but not interchangeable. The responsible question is always: what exactly was dated, how securely was it associated with the evidence, and what uncertainty remains?",
    "This is especially important when a site is described with a rounded age or a cultural label. Such language can help readers find the story, yet it can also make a complex sequence sound more precise or more uniform than it was. " + caution + " A good field note leaves room for revision when new samples, better mapping or a different comparison changes the picture.",
    "## What the evidence cannot prove",
    "There is also a limit to the story. " + caution + " Archaeology is not weakened by these limits; it becomes more trustworthy when the boundary between evidence and interpretation is named. The goal is not to remove uncertainty with confident prose, but to show which parts of the account are secure and which remain open.",
    "That caution has an ethical dimension. Human remains, Indigenous heritage, sacred images and community histories should not be treated as raw material for spectacle. The people connected to a place, whether through ancestry, scholarship or stewardship, are part of the context in which the site is understood today.",
    "## Preservation and public memory",
    preservation + " Preservation is therefore not an afterthought. Water, heat, visitors, construction, poor storage and earlier excavation can all change what survives. Digital records and museum displays help, but they cannot replace the original context. Protecting a site means protecting the relationships that allow future readers to ask new questions.",
    "Public interpretation matters too. A short caption can make a site memorable, but it can also flatten a complicated history into one dramatic claim. The editorial approach of The Archaeologist is to keep the sense of wonder while showing the work underneath it: the layers, comparisons, uncertainties and people who maintain the archive.",
    "## Questions to carry forward",
    "Three questions keep this field note open. First, which details are directly observed and which are interpretations built from comparison? Second, what evidence is missing because of decay, disturbance, access or earlier research practice? Third, what future discovery would change the current explanation? For this site, the practical question is also " + lens.questions + " These questions make the story useful beyond a single visit or search result.",
    "## Field note",
    takeaway + " That is the larger lesson of " + title + ": the past is not a sealed room, and it is not a simple list of spectacular objects. It is a working archive made from traces, methods, places and disagreements. Read slowly, place the evidence in context, and the story becomes more than a headline. It becomes a way to see how knowledge is built.",
    "This note is an independent editorial synthesis for The Archaeologist. It preserves uncertainty where the record requires it and points readers back to the associated source record for further research. It is written to help readers understand the evidence, not to replace specialist publications or the communities who care for the heritage."
  ].join("\n\n");

  const sentences = content.split(/(?<=[.!?])\s+/).filter(Boolean);
  const excerpt = clean(sentences.slice(0, 2).join(" ")).slice(0, 255).replace(/\s+\S*$/, "") + "…";
  return { slug: article.slug, excerpt, content };
}

const articles = editorial.articles.map(expand);
const counts = articles.map((article) => words(article.content));
console.log("Expanded", articles.length, "articles:", Math.min(...counts), "-", Math.max(...counts), "words; average", Math.round(counts.reduce((a, b) => a + b, 0) / counts.length));
fs.writeFileSync("data/editorial-content.json", JSON.stringify({ generatedAt: new Date().toISOString(), articles }, null, 2) + "\n");
