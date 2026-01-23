export const DISEASES = [
    {
        id: 'UNKNOWN',
        crop: 'N/A',
        name: { en: "Detection Uncertain", ta: "கண்டறிவதில் நிச்சயமற்ற நிலை" },
        isHealthy: false,
        severity: 'N/A',
        symptoms: {
            en: "The AI cannot find a clear match. The image may be unclear, or the leaf condition is not recognized.",
            ta: "AI-ஆல் சரியான முடிவைக் கண்டறிய முடியவில்லை. படம் மங்கலாக இருக்கலாம் அல்லது இலை நிலை அடையாளம் காணப்படவில்லை."
        },
        cause: { en: "Image quality issues or rare plant variety.", ta: "படத்தின் தரம் குறைவு அல்லது அரிதான தாவர வகை." },
        remedy_organic: {
            en: "1. Clean the leaf surface. 2. Take a photo in bright, indirect sunlight. 3. Focus on a single leaf showing clear symptoms.",
            ta: "1. இலையின் மேற்பரப்பை சுத்தம் செய்யவும். 2. பிரகாசமான சூரிய ஒளியில் புகைப்படம் எடுக்கவும். 3. நோய் அறிகுறிகள் உள்ள ஒரு இலையில் மட்டும் கவனம் செலுத்தவும்."
        },
        remedy_chemical: {
            en: "Do not apply chemical pesticides until a clear diagnosis is made by an expert.",
            ta: "நிபுணரால் சரியான நோய் கண்டறியப்படும் வரை ரசாயன பூச்சிக்கொல்லிகளைப் பயன்படுத்த வேண்டாம்."
        },
        prevention: {
            en: "Regularly monitor your crops and scan as soon as you see the first sign of an issue.",
            ta: "பயிர்களைத் தொடர்ந்து கண்காணித்து, ஏதேனும் பிரச்சனை தென்பட்டால் உடனே ஸ்கேன் செய்யவும்."
        }
    },
    // --- TOMATO ---
    {
        id: 'tomato_healthy',
        crop: 'Tomato',
        name: { en: "Tomato - Healthy", ta: "தக்காளி - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Leaves are vibrant green, firm, and free of spots.", ta: "இலைகள் துடிப்பான பச்சை நிறமாகவும், உறுதியாகவும், புள்ளிகள் அற்றதாகவும் இருக்கும்." },
        remedy: { en: "Continue regular care.", ta: "வழக்கமான பராமரிப்பைத் தொடரவும்." }
    },
    {
        id: 'tomato_early_blight',
        crop: 'Tomato',
        name: { en: "Tomato - Early Blight", ta: "தக்காளி - முன்கூட்டிய கருகல் நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Concentric rings (bullseye) on older leaves. Leathery black spots on fruit near stem.", ta: "பழைய இலைகளில் வளையங்கள். தண்டு அருகே பழங்களில் தோல் போன்ற கருப்பு புள்ளிகள்." },
        cause: { en: "Fungus: Alternaria solani (TNAU Verified)", ta: "பூஞ்சை: ஆல்டர்நேரியா சோலானி" },
        remedy_organic: { en: "Remove infected leaves. Spray Neem oil or 5% NSKE.", ta: "பாதிக்கப்பட்ட இலைகளை அகற்றவும். வேப்ப எண்ணெய் அல்லது 5% NSKE தெளிக்கவும்." },
        remedy_chemical: { en: "Spray Mancozeb (2g/l) or Chlorothalonil.", ta: "மன்கோசெப் (2கி/லி) அல்லது குளோரோதலோனில் தெளிக்கவும்." },
        prevention: { en: "Mulch soil. Avoid overhead irrigation.", ta: "மண்ணை மூடி வைக்கவும். இலைகளின் மேல் நீர் ஊற்றுவதைத் தவிர்க்கவும்." }
    },
    {
        id: 'tomato_spotted_wilt',
        crop: 'Tomato',
        name: { en: "Tomato - Spotted Wilt", ta: "தக்காளி - புள்ளி வாடல் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Bronzing of young leaves, severe stunting, chlorotic rings on fruits.", ta: "இளம் இலைகள் வெண்கல நிறமாதல், வளர்ச்சி குன்றுதல், பழங்களில் வளையங்கள்." },
        cause: { en: "Virus transmitted by Thrips (TNAU Verified)", ta: "தத்துப்பூச்சிகளால் பரவும் வைரஸ்" },
        remedy_organic: { en: "Remove and burn infected plants immediately.", ta: "பாதிக்கப்பட்ட செடிகளை உடனடியாக அகற்றி எரித்துவிடவும்." },
        remedy_chemical: { en: "Control Thrips with Imidacloprid 17.8 SL.", ta: "இமிடாக்குளோபிரிட் 17.8 SL கொண்டு தத்துப்பூச்சிகளை கட்டுப்படுத்தவும்." },
        prevention: { en: "Use virus-free seedlings. Destroy weed hosts.", ta: "நோய் இல்லாத நாற்றுகளைப் பயன்படுத்தவும். களைகளை அழிக்கவும்." }
    },

    // --- BRINJAL (EGGPLANT) ---
    {
        id: 'brinjal_shoot_borer',
        crop: 'Brinjal',
        name: { en: "Brinjal - Fruit & Shoot Borer", ta: "கத்தரி - காய் மற்றும் தண்டு துளைப்பான்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Wilting of terminal shoots. Holes in fruits with larval excreta.", ta: "நுனித் தளிர்கள் வாடுதல். காய்களில் புழுக்களின் கழிவுகளுடன் கூடிய துளைகள்." },
        cause: { en: "Pest: Leucinodes orbonalis (TNAU Verified)", ta: "பூச்சி: லியூசினோட்ஸ் ஆர்போனாலிஸ்" },
        remedy_organic: { en: "Pheromone traps (12/ha). Encourage natural enemies like Trichogramma.", ta: "இனக்கவர்ச்சி பொறிகள் (12/ஹெக்டேர்). டிரைக்கோகிராமா போன்ற இயற்கை எதிரிகளை ஊக்கப்படுத்தவும்." },
        remedy_chemical: { en: "Spray Emamectin benzoate 5% SG or Chlorantraniliprole.", ta: "எமாமெக்டின் பென்சோயேட் 5% SG அல்லது குளோரான்ட்ரானிலிப்ரோல் தெளிக்கவும்." },
        prevention: { en: "Clip and destroy infested shoots weekly.", ta: "பாதிக்கப்பட்ட தளிர்களை வாரம் ஒருமுறை வெட்டி அழிக்கவும்." }
    },
    {
        id: 'brinjal_bacterial_wilt',
        crop: 'Brinjal',
        name: { en: "Brinjal - Bacterial Wilt", ta: "கத்தரி - பாக்டீரியா வாடல் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Sudden wilting of the whole plant without yellowing. Vascular browning.", ta: "மஞ்சள் நிறமாகாமல் செடி திடீரென வாடுதல். தண்டு உட்பகுதி பழுப்பு நிறமாதல்." },
        cause: { en: "Bacteria: Ralstonia solanacearum", ta: "பாக்டீரியா: ரால்ஸ்டோனியா சொலானாசியரம்" },
        remedy_organic: { en: "Soil drenching with Pseudomonas fluorescens.", ta: "மண்ணில் சூடோமோனாஸ் ஃப்ளோரசன்ஸ் ஊற்றவும்." },
        remedy_chemical: { en: "Apply bleaching powder to soil or Streptocycline drenching.", ta: "மண்ணில் பிளீச்சிங் பவுடர் இடவும் அல்லது ஸ்டிரெப்டோசைக்ளின் ஊற்றவும்." },
        prevention: { en: "Crop rotation with non-host crops like Paddy.", ta: "நெல் போன்ற மற்ற பயிர்களுடன் பயிர் சுழற்சி செய்யவும்." }
    },

    // --- CHILLI ---
    {
        id: 'chilli_leaf_curl',
        crop: 'Chilli',
        name: { en: "Chilli - Leaf Curl", ta: "மிளகாய் - இலை சுருள் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Leaves curl upwards, thicken, and become small. Stunted growth.", ta: "இலைகள் மேல்நோக்கி சுருண்டு, தடித்து, சிறியதாக மாறும்." },
        cause: { en: "Virus transmitted by Whitefly (TNAU Verified)", ta: "வெள்ளை ஈக்களால் பரவும் வைரஸ்" },
        remedy_organic: { en: "Yellow sticky traps. Spray Neem oil (3%).", ta: "மஞ்சள் ஒட்டும் பொறிகள். வேப்ப எண்ணெய் (3%) தெளிக்கவும்." },
        remedy_chemical: { en: "Spray Imidacloprid 17.8 SL or Dimethoate.", ta: "இமிடாக்குளோபிரிட் 17.8 SL அல்லது டைமெத்தோயேட் தெளிக்கவும்." },
        prevention: { en: "Grow barrier crops like Maize/Sorghum.", ta: "சோளம் போன்ற வரப்பு பயிர்களை வளர்க்கவும்." }
    },
    {
        id: 'chilli_anthracnose',
        crop: 'Chilli',
        name: { en: "Chilli - Anthracnose (Fruit Rot)", ta: "மிளகாய் - ஆந்த்ராக்னோஸ் (காய் அழுகல்)" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Small, black, circular spots on ripe fruits. Fruit turns straw colored.", ta: "பழுத்த காய்களில் சிறிய, கருப்பு, வட்டமான புள்ளிகள். காய் வைக்கோல் நிறமாக மாறும்." },
        cause: { en: "Fungus: Colletotrichum capsici", ta: "பூஞ்சை: கோலெட்டோட்ரிகம் கேப்சிகி" },
        remedy_organic: { en: "Seed treatment with Trichoderma viride.", ta: "டிரைக்கோடெர்மா விரிடி கொண்டு விதை நேர்த்தி செய்யவும்." },
        remedy_chemical: { en: "Spray Mancozeb (2.5g/l) or Carbendazim (1g/l).", ta: "மன்கோசெப் (2.5கி/லி) அல்லது கார்பென்டாசிம் (1கி/லி) தெளிக்கவும்." },
        prevention: { en: "Use healthy seeds. Maintain proper field drainage.", ta: "ஆரோக்கியமான விதைகளைப் பயன்படுத்தவும். முறையான வடிகால் வசதி செய்யவும்." }
    },

    // --- PADDY (RICE) ---
    {
        id: 'paddy_blast',
        crop: 'Paddy',
        name: { en: "Paddy - Blast", ta: "நெல் - குலை நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Spindle-shaped spots with gray center. Neck rot in grains.", ta: "இலைகளில் சாம்பல் மையத்துடன் கதிர் வடிவ புள்ளிகள். கதிர் கழுத்து அழுகல்." },
        cause: { en: "Fungus: Pyricularia oryzae (TNAU Verified)", ta: "பூஞ்சை: பைரிகுலேரியா ஒரைசே" },
        remedy_organic: { en: "Foliar spray of Pseudomonas fluorescens (0.5%).", ta: "சூடோமோனாஸ் ஃப்ளோரசன்ஸ் (0.5%) இலைத்தெளிப்பு." },
        remedy_chemical: { en: "Spray Tricyclazole 75 WP (1g/l) or Carbendazim.", ta: "ட்ரைசைக்ளோசோல் 75 WP (1கி/லி) அல்லது கார்பென்டாசிம் தெளிக்கவும்." },
        prevention: { en: "Avoid excessive nitrogen. Split N application.", ta: "அதிகப்படியான நைட்ரஜனைத் தவிர்க்கவும்." }
    },
    {
        id: 'paddy_bacterial_blight',
        crop: 'Paddy',
        name: { en: "Paddy - Bacterial Leaf Blight", ta: "நெல் - பாக்டீரியா இலை கருகல்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Wavy yellow streaks from leaf tips. Milky ooze in early morning.", ta: "இலை நுனியில் இருந்து அலை அலையான மஞ்சள் கோடுகள். அதிகாலையில் பால் போன்ற திரவம்." },
        cause: { en: "Bacteria: Xanthomonas oryzae", ta: "பாக்டீரியா: சாந்தோமோனாஸ் ஒரைசே" },
        remedy_organic: { en: "Spray fresh cow dung extract (20%).", ta: "புதிய பசுந்தீவனக் கரைசல் (20%) தெளிக்கவும்." },
        remedy_chemical: { en: "Spray Streptocycline (0.05g) + Copper oxychloride (1.5g) per liter.", ta: "ஸ்டிரெப்டோசைக்ளின் + காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்." },
        prevention: { en: "Drain field during infection. Avoid clipping tips.", ta: "பாதிக்கப்பட்ட போது நீரை வடித்து விடவும்." }
    },
    {
        id: 'paddy_brown_spot',
        crop: 'Paddy',
        name: { en: "Paddy - Brown Spot", ta: "நெல் - பழுப்பு புள்ளி நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Small, oval, brown spots on leaves with gray/white centers.", ta: "இலைகளில் சாம்பல்/வெள்ளை மையத்துடன் கூடிய சிறிய, ஓவல், பழுப்பு நிற புள்ளிகள்." },
        cause: { en: "Fungus: Helminthosporium oryzae (TNAU Verified)", ta: "பூஞ்சை: ஹெல்மின்டோஸ்போரியம் ஒரைசே" },
        remedy_organic: { en: "Apply potash. Foliar spray of Pseudomonas fluorescens.", ta: "பொட்டாஷ் உரத்தை இடவும். சூடோமோனாஸ் ஃப்ளோரசன்ஸ் தெளிக்கவும்." },
        remedy_chemical: { en: "Spray Mancozeb (2g/l) or Edifenphos.", ta: "மன்கோசெப் (2கி/லி) அல்லது எடிஃபென்போஸ் தெளிக்கவும்." },
        prevention: { en: "Use healthy seeds. Balanced nutrition.", ta: "ஆரோக்கியமான விதைகளைப் பயன்படுத்தவும். சமச்சீரான ஊட்டச்சத்து அளிக்கவாம்." }
    },
    {
        id: 'paddy_healthy',
        crop: 'Paddy',
        name: { en: "Paddy - Healthy", ta: "நெல் - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Leaves are vibrant green and upright.", ta: "இலைகள் துடிப்பான பச்சை நிறமாகவும் நிமிர்ந்தும் இருக்கும்." },
        remedy_organic: { en: "Maintain water level and regular fertilization.", ta: "நீர் மட்டம் மற்றும் வழக்கமான உரமிடுதலைப் பராமரிக்கவும்." },
        remedy_chemical: { en: "None required.", ta: "தேவையில்லை." },
        prevention: { en: "Regular monitoring.", ta: "தொடர் கண்காணிப்பு." }
    },

    // --- SUGARCANE ---
    {
        id: 'sugarcane_red_rot',
        crop: 'Sugarcane',
        name: { en: "Sugarcane - Red Rot", ta: "கரும்பு - செவ்வழுகல் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Internal stalk turns red with white patches. Alcohol smell when split.", ta: "தண்டின் உட்பகுதி சிவப்பாக மாறும். பிளக்கும் போது சாராய வாசனை வரும்." },
        cause: { en: "Fungus: Colletotrichum falcatum (TNAU Verified)", ta: "பூஞ்சை: கோலெட்டோட்ரிகம் ஃபால்கேட்டம்" },
        remedy_organic: { en: "Sett treatment with Trichoderma viride.", ta: "டிரைக்கோடெர்மா விரிடி கொண்டு கரணை நேர்த்தி செய்யவும்." },
        remedy_chemical: { en: "Soak setts in Carbendazim solution (0.1%).", ta: "கார் பென்டாசிம் கரைசலில் (0.1%) கரணைகளை ஊறவைக்கவும்." },
        prevention: { en: "Use healthy setts. Avoid ratoon in infested fields.", ta: "ஆரோக்கியமான கரணைகளைப் பயன்படுத்தவும்." }
    },
    {
        id: 'sugarcane_smut',
        crop: 'Sugarcane',
        name: { en: "Sugarcane - Smut", ta: "கரும்பு - கரிப்பூட்டை நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Whip-like black structure from the growing tip. Stunted growth.", ta: "வளர்ச்சி முனையில் இருந்து சாட்டை போன்ற கருப்பு அமைப்பு உருவாகும்." },
        cause: { en: "Fungus: Ustilago scitaminea", ta: "பூஞ்சை: உஸ்டிலாகோ சிடாமினியா" },
        remedy_organic: { en: "Remove smut whips in a cloth bag and burn.", ta: "கரிப்பூட்டை சாட்டைகளை துணிப்பையில் சேகரித்து எரிக்கவும்." },
        remedy_chemical: { en: "Treat setts with Triadimefon (1g/l) for 15 mins.", ta: "டிரையாடிமெஃபோன் கொண்டு 15 நிமிடங்கள் நேர்த்தி செய்யவும்." },
        prevention: { en: "Avoid rationing of infected crop.", ta: "பாதிக்கப்பட்ட பயிரை மறுதாம்பு பயிராக வளர்க்க வேண்டாம்." }
    },

    // --- COCONUT ---
    {
        id: 'coconut_tanjore_wilt',
        crop: 'Coconut',
        name: { en: "Coconut - Tanjore Wilt", ta: "தென்னை - தஞ்சாவூர் வாடல் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Yellowing/drooping of outer leaves. Reddish-brown liquid leaks from trunk base.", ta: "வெளிப்புற இலைகள் மஞ்சள் நிறமாகி தொங்குதல். தண்டு அடியில் சிவப்பு திரவம் வடிதல்." },
        cause: { en: "Fungus: Ganoderma lucidum (TNAU Verified)", ta: "பூஞ்சை: கானோடெர்மா லூசிடம்" },
        remedy_organic: { en: "Apply Neem cake (5kg/palm). Drench soil with Pseudomonas.", ta: "வேப்பம் புண்ணாக்கு (5கி/மரம்) இடவும். சூடோமோனாஸ் கொண்டு மண்ணை நனைக்கவும்." },
        remedy_chemical: { en: "Trunk injection: Aureofungin-sol + Copper sulphate.", ta: "தண்டு ஊசி மூலம் மருந்துகளை செலுத்தவும்." },
        prevention: { en: "Isolation trenches around infected palms.", ta: "பாதிக்கப்பட்ட மரங்களைச் சுற்றி தனிமைப்படுத்தப்பட்ட அகழிகள் தோண்டவும்." }
    },
    {
        id: 'coconut_rhino_beetle',
        crop: 'Coconut',
        name: { en: "Coconut - Rhinoceros Beetle", ta: "தென்னை - காண்டாமிருக வண்டு" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "V-shaped cuts on fronds. Holes in crown with chewed fibers.", ta: "இலைகளில் V-வடிவ வெட்டுக்கள். கொண்டையில் மெல்லப்பட்ட நார்களுடன் கூடிய துளைகள்." },
        cause: { en: "Pest: Oryctes rhinoceros", ta: "பூச்சி: ஒரிக்டெஸ் ரைனோசெரோஸ்" },
        remedy_organic: { en: "Application of Metarhizium anisopliae to manure pits.", ta: "எருக் குழிகளில் மெட்டாரைசியம் பூஞ்சையை இடவும்." },
        remedy_chemical: { en: "Place Naphthalene balls + Sand in leaf axils.", ta: "இலை இடுக்குகளில் நாப்தலீன் உருண்டைகள் மற்றும் மணல் கலவையை வைக்கவும்." },
        prevention: { en: "Maintain farm hygiene. Destroy decaying logs.", ta: "தோட்டத்தை சுத்தமாக பராமரிக்கவும்." },
        diagnosticChecklist: {
            title: { en: "Plantix Technique: Tree Audit", ta: "பிளான்டிக்ஸ் முறை: மரத் தணிக்கை" },
            steps: [
                { en: "Check for V-shaped cuts on the leaves.", ta: "இலைகளில் V-வடிவ வெட்டுக்கள் உள்ளதா எனப் பார்க்கவும்." },
                { en: "Search for holes in the tree crown.", ta: "மரத்தின் உச்சியில் துளைகள் உள்ளதா எனத் தேடவும்." },
                { en: "Look for chewed fiber (frass) near the holes.", ta: "துளைகளுக்கு அருகில் மெல்லப்பட்ட நார் (கழிவு) உள்ளதா எனப் பார்க்கவும்." }
            ]
        }
    },
    {
        id: 'coconut_tanjore_wilt',
        crop: 'Coconut',
        name: { en: "Coconut - Tanjore Wilt", ta: "தென்னை - தஞ்சாவூர் வாடல் நோய் (வாடல்)" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Lower fronds show yellowing and drooping. Gradual reduction in leaf size.", ta: "கீழ் மட்டைகள் மஞ்சளாகி தொங்கும். இலைகளின் அளவு படிப்படியாக குறையும்." },
        cause: { en: "Fungus: Ganoderma lucidum (TNAU Verified)", ta: "பூஞ்சை: கணோடெர்மா லூசிடம்" },
        remedy_organic: { en: "Apply 5kg Neem cake/tree/year. Soil drench with 1% Bordeaux mixture.", ta: "ஒரு மரத்திற்கு 5 கிலோ வேப்பம் புண்ணாக்கு இடவும். 1% போர்டோ கலவை கொண்டு மண்ணை நனைக்கவும்." },
        remedy_chemical: { en: "Root feeding with Hexaconazole (2ml in 100ml water).", ta: "ஹெக்சகோனசோல் (2மி.லி - 100மி.லி நீரில்) வேர் மூலம் ஊட்டவும்." },
        prevention: { en: "Isolate infected trees by digging trenches (1m deep).", ta: "பாதிக்கப்பட்ட மரங்களைச் சுற்றி 1மீ ஆழத்தில் அகழி வெட்டவும்." },
        diagnosticChecklist: {
            title: { en: "Plantix Technique: Trunk Check", ta: "பிளான்டிக்ஸ் முறை: தண்டு பரிசோதனை" },
            steps: [
                { en: "Look for reddish-brown liquid bleeding from the trunk base.", ta: "மரத்தின் அடிப்பகுதியில் சிவப்பான திரவம் வழிகிறதா எனப் பார்க்கவும்." },
                { en: "Check if the stem shows any softening or decay near the soil.", ta: "மண்ணிற்கு அருகில் தண்டு மென்மையாக மாறியுள்ளதா எனப் பார்க்கவும்." },
                { en: "Observe if the lower leaves are drooping while the top stays green.", ta: "மேல் பகுதி பச்சையாக இருக்கும்போது கீழ் இலைகள் தொங்குகிறதா என கவனிக்கவும்." }
            ]
        }
    },
    {
        id: 'coconut_bud_rot',
        crop: 'Coconut',
        name: { en: "Coconut - Bud Rot", ta: "தென்னை - குருத்தழுகல் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Withered central spear leaf. Yellowing of adjacent leaves.", ta: "மையக் குருத்து வாடுதல். அருகில் உள்ள இலைகள் மஞ்சளாதல்." },
        cause: { en: "Fungus: Phytophthora palmivora", ta: "பூஞ்சை: பைட்டோப்துரா பால்மிவோரா" },
        remedy_organic: { en: "Remove infected tissues and apply Bordeaux paste.", ta: "பாதிக்கப்பட்ட திசுக்களை அகற்றி போர்டோ பசையைப் பயன்படுத்தவும்." },
        remedy_chemical: { en: "Spray 1% Bordeaux mixture or Copper oxychloride (3g/l).", ta: "1% போர்டோ கலவை அல்லது காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்." },
        prevention: { en: "Improved field drainage and wider tree spacing.", ta: "முறையான வடிகால் மற்றும் மரம் நடுவதில் சரியான இடைவெளி." },
        diagnosticChecklist: {
            title: { en: "Plantix Technique: Crown Check", ta: "பிளான்டிக்ஸ் முறை: கொண்டை பரிசோதனை" },
            steps: [
                { en: "Gently tug the central spear leaf; it will pull out easily if rotten.", ta: "மையக் குருத்தை மெதுவாக இழுக்கவும்; அழுகியிருந்தால் அது எளிதாக வெளியே வரும்." },
                { en: "Check for a foul-smelling odor near the center of the crown.", ta: "கொண்டையின் மையத்தில் துர்நாற்றம் வீசுகிறதா எனப் பார்க்கவும்." },
                { en: "Observe if the crown is partially flattening out.", ta: "மரம் கொண்டை பகுதி தட்டையாக மாறுகிறதா என கவனிக்கவும்." }
            ]
        }
    },

    // --- TURMERIC ---
    {
        id: 'turmeric_rhizome_rot',
        crop: 'Turmeric',
        name: { en: "Turmeric - Rhizome Rot", ta: "மஞ்சள் - கிழங்கு அழுகல் நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Leaves turn yellow and dry. Rhizomes soften and decay.", ta: "இலைகள் மஞ்சளாகி காய்ந்துவிடும். கிழங்குகள் மென்மையாகி அழுகிவிடும்." },
        cause: { en: "Fungus: Pythium aphanidermatum", ta: "பூஞ்சை: பைத்தியம் அப்னிடெர்மேட்டம்" },
        remedy_organic: { en: "Soil drenching with Trichoderma viride.", ta: "டிரைக்கோடெர்மா விரிடி கொண்டு மண்ணை நனைக்கவும்." },
        remedy_chemical: { en: "Seed treatment with Metalaxyl (3g/kg).", ta: "மெட்டாலாக்ஸில் கொண்டு விதை நேர்த்தி செய்யவும்." },
        prevention: { en: "Select healthy rhizomes. Ensure good drainage.", ta: "ஆரோக்கியமான கிழங்குகளைத் தேர்ந்தெடுக்கவும்." }
    },
    {
        id: 'turmeric_leaf_spot',
        crop: 'Turmeric',
        name: { en: "Turmeric - Leaf Spot", ta: "மஞ்சள் - இலை புள்ளி நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Brown spots with gray centers on leaves. Premature drying.", ta: "இலைகளில் சாம்பல் மையத்துடன் கூடிய பழுப்பு நிற புள்ளிகள்." },
        cause: { en: "Fungus: Colletotrichum capsici", ta: "பூஞ்சை: கோலெட்டோட்ரிகம் கேப்சிகி" },
        remedy_organic: { en: "Spray 1% Bordeaux mixture.", ta: "1% போர்டோ கலவை தெளிக்கவும்." },
        remedy_chemical: { en: "Spray Mancozeb (2.5g/l).", ta: "மன்கோசெப் (2.5கி/லி) தெளிக்கவும்." },
        prevention: { en: "Proper shade management. Remove infected leaves.", ta: "முறையான நிழல் மேலாண்மை." }
    },

    // --- POTATO ---
    {
        id: 'potato_late_blight',
        crop: 'Potato',
        name: { en: "Potato - Late Blight", ta: "உருளைக்கிழங்கு - தாமதமான கருகல்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Water-soaked spots turning black. White mold on underside.", ta: "நீர் ஊறிய புள்ளிகள் கருப்பாக மாறுதல். அடியில் வெள்ளை பூஞ்சை தோன்றுதல்." },
        cause: { en: "Fungus: Phytophthora infestans", ta: "பூஞ்சை: பைட்டோப்துரா இன்ஃபெஸ்டான்ஸ்" },
        remedy_organic: { en: "Spray Copper oxychloride. Destroy infected piles.", ta: "காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும். பாதிக்கப்பட்ட குவியல்களை அழிக்கவும்." },
        remedy_chemical: { en: "Spray Metalaxyl + Mancozeb (2g/l).", ta: "மெட்டாலாக்ஸில் + மன்கோசெப் தெளிக்கவும்." },
        prevention: { en: "Use certified disease-free seeds.", ta: "சான்றளிக்கப்பட்ட நோய் இல்லாத விதைகளைப் பயன்படுத்தவும்." }
    }
];
