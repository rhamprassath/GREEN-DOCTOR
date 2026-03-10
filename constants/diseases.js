export const DISEASES = [
    {
        id: 'UNKNOWN',
        crop: 'N/A',
        name: { en: "Detection Uncertain", ta: "கண்டறிவதில் நிச்சயமற்ற நிலை" },
        isHealthy: false,
        severity: 'N/A',
        symptoms: {
            en: "No leaf detected or detection confidence is low. The image may be too blurry, random (non-plant), or the leaf is too far away.",
            ta: "இலை அடையாளம் காணப்படவில்லை அல்லது துல்லியம் குறைவாக உள்ளது. படம் மங்கலாக இருக்கலாம் அல்லது செடியல்லாத மற்ற பொருளாக இருக்கலாம்."
        },
        cause: { en: "Non-plant image or poor photo quality.", ta: "செடியல்லாத படம் அல்லது படத்தின் தரம் குறைவு." },
        remedy_organic: {
            en: "1. Ensure the leaf is the main subject. 2. Clear background. 3. Good lighting. 4. Hold the camera closer (10-15cm).",
            ta: "1. இலையை படத்தின் மையத்தில் வைக்கவும். 2. பின்புலத்தை சுத்தமாக வைக்கவும். 3. நல்ல வெளிச்சத்தில் படம் எடுக்கவும். 4. கேமராவை சற்று நெருக்கமாக (10-15 செ.மீ) பிடிக்கவும்."
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
        id: 'potato_healthy',
        crop: 'Potato',
        name: { en: "Potato - Healthy", ta: "உருளைக்கிழங்கு - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Leaves are lush green and free of any spots or lesions.", ta: "இலைகள் பசுமையாகவும் எந்தவிதமான புள்ளிகளும் இல்லாமல் இருக்கும்." },
        remedy_organic: { en: "Maintain regular hilling and irrigation.", ta: "வழக்கமான மண் அணைத்தல் மற்றும் நீர் பாய்ச்சுதலைப் பராமரிக்கவும்." },
        remedy_chemical: { en: "None required.", ta: "தேவையில்லை." },
        prevention: { en: "Use certified disease-free seed tubers.", ta: "சான்றளிக்கப்பட்ட நோய் இல்லாத கிழங்குகளைப் பயன்படுத்தவும்." }
    },
    {
        id: 'potato_early_blight',
        crop: 'Potato',
        name: { en: "Potato - Early Blight", ta: "உருளைக்கிழங்கு - முன்கூட்டிய கருகல்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Small, black spots with concentric rings on older leaves.", ta: "பழைய இலைகளில் வளையங்களுடன் கூடிய சிறிய கருப்பு புள்ளிகள்." },
        cause: { en: "Fungus: Alternaria solani", ta: "பூஞ்சை: ஆல்டர்நேரியா சோலானி" },
        remedy_organic: { en: "Remove infected leaves. Spray Neem oil.", ta: "பாதிக்கப்பட்ட இலைகளை அகற்றவும். வேப்ப எண்ணெய் தெளிக்கவும்." },
        remedy_chemical: { en: "Spray Mancozeb (2g/l) or Chlorothalonil.", ta: "மன்கோசெப் (2கி/லி) அல்லது குளோரோதலோனில் தெளிக்கவும்." },
        prevention: { en: "Crop rotation and proper spacing.", ta: "பயிர் சுழற்சி மற்றும் முறையான இடைவெளி." }
    },
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
    },

    // --- CORN ---
    {
        id: 'corn_common_rust',
        crop: 'Corn',
        name: { en: "Corn - Common Rust", ta: "சோளம் - துரு நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Cinnamon-brown pustules on both leaf surfaces.", ta: "இலையின் இருபுறமும் பழுப்பு நிற கொப்புளங்கள்." },
        cause: { en: "Fungus: Puccinia sorghi", ta: "பூஞ்சை: புக்சினியா சோர்கி" },
        remedy_organic: { en: "Use resistant varieties. Spray compost tea.", ta: "எதிர்ப்புத் திறன் கொண்ட ரகங்களைப் பயன்படுத்தவும்." },
        remedy_chemical: { en: "Spray Mancozeb or Pyraclostrobin.", ta: "மன்கோசெப் அல்லது பைராக்ளோஸ்ட்ரோபின் தெளிக்கவும்." },
        prevention: { en: "Avoid late planting. Remove crop debris.", ta: "தாமதமாக நடவு செய்வதைத் தவிர்க்கவும்." }
    },
    {
        id: 'corn_gray_leaf_spot',
        crop: 'Corn',
        name: { en: "Corn - Gray Leaf Spot", ta: "சோளம் - சாம்பல் இலை புள்ளி" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Rectangular, gray to tan spots parallel to leaf veins.", ta: "இலை நரம்புகளுக்கு இணையாக செவ்வக வடிவ சாம்பல் நிற புள்ளிகள்." },
        cause: { en: "Fungus: Cercospora zeae-maydis", ta: "பூஞ்சை: செர்கோஸ்போரா சீ-மேடிஸ்" },
        remedy_organic: { en: "Tillage to bury debris. Crop rotation.", ta: "களைகளை ஆழமாக உழுது அழிக்கவும். பயிர் சுழற்சி." },
        remedy_chemical: { en: "Spray Propiconazole or Azoxystrobin.", ta: "புரோப்பிகோனசோல் அல்லது அசோக்ஸிஸ்ட்ரோபின் தெளிக்கவும்." },
        prevention: { en: "Use resistant hybrids. Clean cultivation.", ta: "எதிர்ப்புத் திறன் கொண்ட கலப்பினங்களைப் பயன்படுத்தவும்." }
    },
    {
        id: 'corn_healthy',
        crop: 'Corn',
        name: { en: "Corn - Healthy", ta: "சோளம் - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Broad, vibrant green leaves with strong stalks.", ta: "துடிப்பான பச்சை நிற இலைகள் மற்றும் வலிமையான தண்டுகள்." },
        remedy_organic: { en: "Balanced fertilization and proper irrigation.", ta: "சமச்சீரான உரமிடுதல் மற்றும் முறையான நீர் மேலாண்மை." },
        remedy_chemical: { en: "None required.", ta: "தேவையில்லை." },
        prevention: { en: "Regular scouting.", ta: "தொடர் கண்காணிப்பு." }
    },

    // --- WHEAT ---
    {
        id: 'wheat_brown_rust',
        crop: 'Wheat',
        name: { en: "Wheat - Brown Rust", ta: "கோதுமை - பழுப்பு துரு நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Small, orange-brown circular pustules on leaf blades.", ta: "இலைகளில் சிறிய ஆரஞ்சு-பழுப்பு நிற வட்ட வடிவ கொப்புளங்கள்." },
        cause: { en: "Fungus: Puccinia triticina", ta: "பூஞ்சை: புக்சினியா டிரிடிசினா" },
        remedy_organic: { en: "Resistant varieties. Early sowing.", ta: "எதிர்ப்பு ரகங்கள். முன்கூட்டியே விதைத்தல்." },
        remedy_chemical: { en: "Spray Tebuconazole or Triadimefon.", ta: "டெபுகோனசோல் அல்லது டிரையாடிமெஃபோன் தெளிக்கவும்." },
        prevention: { en: "Control volunteer plants. Balanced N usage.", ta: "களைகளைக் கட்டுப்படுத்தவும்." }
    },
    {
        id: 'wheat_yellow_rust',
        crop: 'Wheat',
        name: { en: "Wheat - Yellow Rust", ta: "கோதுமை - மஞ்சள் துரு நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Yellow stripes of pustules parallel to leaf veins.", ta: "இலை நரம்புகளுக்கு இணையாக மஞ்சள் நிற கோடுகளுடன் கூடிய கொப்புளங்கள்." },
        cause: { en: "Fungus: Puccinia striiformis", ta: "பூஞ்சை: புக்சினியா ஸ்ட்ரிஃபார்மிஸ்" },
        remedy_organic: { en: "Plant resistant varieties during cool seasons.", ta: "குளிர் காலங்களில் எதிர்ப்பு ரகங்களை நடவு செய்யவும்." },
        remedy_chemical: { en: "Foliar spray of Propiconazole (1ml/l).", ta: "புரோப்பிகோனசோல் (1மி.லி/லி) இலைத்தெளிப்பு." },
        prevention: { en: "Avoid over-irrigation in winter. Monitor regularly.", ta: "குளிர்காலத்தில் அதிகப்படியான நீர் பாய்ச்சுவதைத் தவிர்க்கவும்." }
    },
    {
        id: 'wheat_healthy',
        crop: 'Wheat',
        name: { en: "Wheat - Healthy", ta: "கோதுமை - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Clean green foliage and sturdy tillers.", ta: "சுத்தமான பச்சை நிற இலைகள் மற்றும் உறுதியான கிளைகள்." },
        remedy_organic: { en: "Maintain optimal soil moisture.", ta: "மண்ணின் ஈரப்பதத்தைப் பராமரிக்கவும்." },
        remedy_chemical: { en: "None required.", ta: "தேவையில்லை." },
        prevention: { en: "Use certified seeds.", ta: "சான்றளிக்கப்பட்ட விதைகளைப் பயன்படுத்தவும்." }
    },
    // --- APPLE ---
    {
        id: 'apple_apple_scab',
        crop: 'Apple',
        name: { en: "Apple - Scab", ta: "ஆப்பிள் - ஸ்காப்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Olive-green spots on leaves turning brown/black. Scabby spots on fruit.", ta: "இலைகளில் ஆலிவ்-பச்சை நிற புள்ளிகள் பழுப்பு/கருப்பு நிறமாக மாறும். பழங்களில் சொரசொரப்பான புள்ளிகள்." },
        cause: { en: "Fungus: Venturia inaequalis", ta: "பூஞ்சை: வெஞ்சுரியா இனாகுவாலிஸ்" },
        remedy_organic: { en: "Remove fallen leaves. Prune for airflow.", ta: "உதிர்ந்த இலைகளை அகற்றவும். காற்று ஓட்டத்திற்காக கவாத்து செய்யவும்." },
        remedy_chemical: { en: "Fungicides containing Myclobutanil or Captan.", ta: "மைக்லோபுட்டானில் அல்லது கேப்டன் கொண்ட பூஞ்சைக் கொல்லிகள்." },
        prevention: { en: "Choose resistant varieties.", ta: "எதிர்ப்பு ரகங்களைத் தேர்ந்தெடுக்கவும்." }
    },
    {
        id: 'apple_black_rot',
        crop: 'Apple',
        name: { en: "Apple - Black Rot", ta: "ஆப்பிள் - கருப்பு அழுகல்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Purple spots on leaves (frog-eye). Rotting fruit turns black.", ta: "இலைகளில் ஊதா நிற புள்ளிகள். அழுகும் பழம் கருப்பு நிறமாக மாறும்." },
        cause: { en: "Fungus: Botryosphaeria obtusa", ta: "பூஞ்சை: போட்ரியோஸ்பேரியா அப்டுசா" },
        remedy_organic: { en: "Remove infected fruit and wood (mummies).", ta: "பாதிக்கப்பட்ட பழம் மற்றும் மரப் பகுதிகளை அகற்றவும்." },
        remedy_chemical: { en: "Spray Captan or Thiophanate-methyl.", ta: "கேப்டன் அல்லது தியோபனேட்-மெத்தில் தெளிக்கவும்." },
        prevention: { en: "Sanitation is key.", ta: "சுத்தம் மிக முக்கியம்." }
    },
    {
        id: 'apple_cedar_apple_rust',
        crop: 'Apple',
        name: { en: "Apple - Cedar Rust", ta: "ஆப்பிள் - சிடார் துரு" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Bright orange-yellow spots on leaves.", ta: "இலைகளில் பிரகாசமான ஆரஞ்சு-மஞ்சள் புள்ளிகள்." },
        cause: { en: "Fungus: Gymnosporangium juniperi-virginianae", ta: "பூஞ்சை: ஜிம்னோஸ்போராஞ்சியம் ஜூனிபெரி-விர்ஜினியானே" },
        remedy_organic: { en: "Remove nearby juniper/cedar trees.", ta: "அருகிலுள்ள ஜூனிபர்/சிடார் மரங்களை அகற்றவும்." },
        remedy_chemical: { en: "Spray Myclobutanil.", ta: "மைக்லோபுட்டானில் தெளிக்கவும்." },
        prevention: { en: "Plant resistant varieties.", ta: "எதிர்ப்பு ரகங்களை நடவு செய்யவும்." }
    },
    {
        id: 'apple_healthy',
        crop: 'Apple',
        name: { en: "Apple - Healthy", ta: "ஆப்பிள் - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Leaves are green and spot-free.", ta: "இலைகள் பச்சையாகவும் புள்ளிகள் இல்லாமலும் இருக்கும்." },
        remedy_organic: { en: "Maintain regular care.", ta: "வழக்கமான பராமரிப்பை மேற்கொள்ளவும்." },
        remedy_chemical: { en: "None.", ta: "எதுவுமில்லை." },
        prevention: { en: "Monitor regularly.", ta: "தொடர்ந்து கண்காணிக்கவும்." }
    },

    // --- BLUEBERRY ---
    {
        id: 'blueberry_healthy',
        crop: 'Blueberry',
        name: { en: "Blueberry - Healthy", ta: "புளுபெர்ரி - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "No visible disease symptoms.", ta: "கண்ணுக்குத் தெரியும் நோய் அறிகுறிகள் இல்லை." },
        remedy: { en: "Keep maintaining soil acidity.", ta: "மண்ணின் அமிலத்தன்மையை பராமரிக்கவும்." }
    },

    // --- CHERRY ---
    {
        id: 'cherry_powdery_mildew',
        crop: 'Cherry',
        name: { en: "Cherry - Powdery Mildew", ta: "செர்ரி - சாம்பல் நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "White powdery growth on leaves/fruit.", ta: "இலைகள்/பழங்களில் வெள்ளை தூள் போன்ற வளர்ச்சி." },
        cause: { en: "Fungus: Podosphaera clandestina", ta: "பூஞ்சை: போடோஸ்பேரா கிளாண்டஸ்டினா" },
        remedy_organic: { en: "Sulfur or Potassium bicarbonate sprays.", ta: "கந்தகம் அல்லது பொட்டாசியம் பைகார்பனேட் தெளிப்பு." },
        remedy_chemical: { en: "Myclobutanil fungicides.", ta: "மைக்லோபுட்டானில் பூஞ்சைக் கொல்லிகள்." },
        prevention: { en: "Prune for airflow.", ta: "காற்று ஓட்டத்திற்காக கவாத்து செய்யவும்." }
    },
    {
        id: 'cherry_healthy',
        crop: 'Cherry',
        name: { en: "Cherry - Healthy", ta: "செர்ரி - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Leaves and fruit look healthy.", ta: "இலைகள் மற்றும் பழங்கள் ஆரோக்கியமாக உள்ளன." },
        remedy: { en: "Regular maintenance.", ta: "வழக்கமான பராமரிப்பு." }
    },

    // --- GRAPE ---
    {
        id: 'grape_black_rot',
        crop: 'Grape',
        name: { en: "Grape - Black Rot", ta: "திராட்சை - கருப்பு அழுகல்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Brown spots on leaves with black borders. Shriveled black fruit.", ta: "இலைகளில் கருப்பு விளிம்புகளுடன் பழுப்பு புள்ளிகள். சுருங்கிய கருப்பு பழம்." },
        cause: { en: "Fungus: Guignardia bidwellii", ta: "பூஞ்சை: கினார்டியா பிட்வெல்லி" },
        remedy_organic: { en: "Remove mummified berries.", ta: "காய்ந்துபோன பழங்களை அகற்றவும்." },
        remedy_chemical: { en: "Mancozeb or Myclobutanil.", ta: "மன்கோசெப் அல்லது மைக்லோபுட்டானில்." },
        prevention: { en: "Good sanitation.", ta: "நல்ல சுகாதாரம்." }
    },
    {
        id: 'grape_black_measles',
        crop: 'Grape',
        name: { en: "Grape - Black Measles", ta: "திராட்சை - எஸ்கா நோய்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Tiger-stripe pattern on leaves. Dark spots on berries.", ta: "இலைகளில் புலி-வரி வடிவம். பழங்களில் அடர் புள்ளிகள்." },
        cause: { en: "Fungal Complex", ta: "பூஞ்சை கலவை" },
        remedy_organic: { en: "Remove infected vines.", ta: "பாதிக்கப்பட்ட கொடிகளை அகற்றவும்." },
        remedy_chemical: { en: "No effective cure once infected.", ta: "தொற்று ஏற்பட்டால் பயனுள்ள தீர்வு இல்லை." },
        prevention: { en: "Protect pruning wounds.", ta: "கவாத்து காயங்களைப் பாதுகாக்கவும்." }
    },
    {
        id: 'grape_leaf_blight',
        crop: 'Grape',
        name: { en: "Grape - Leaf Blight", ta: "திராட்சை - இலை கருகல்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Irregular brown spots on leaves.", ta: "இலைகளில் ஒழுங்கற்ற பழுப்பு புள்ளிகள்." },
        cause: { en: "Fungus: Pseudocercospora vitis", ta: "பூஞ்சை: சூடோசெர்கோஸ்போரா விடிஸ்" },
        remedy_organic: { en: "Copper based sprays.", ta: "காப்பர் அடிப்படையிலான தெளிப்பான்கள்." },
        remedy_chemical: { en: "Captan or Mancozeb.", ta: "கேப்டன் அல்லது மன்கோசெப்." },
        prevention: { en: "Reduce humidity.", ta: "ஈரப்பதத்தைக் குறைக்கவும்." }
    },
    {
        id: 'grape_healthy',
        crop: 'Grape',
        name: { en: "Grape - Healthy", ta: "திராட்சை - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Vines are vigorous and clean.", ta: "கொடிகள் வீரியமாகவும் சுத்தமாகவும் உள்ளன." },
        remedy: { en: "Regular pruning and water.", ta: "வழக்கமான கவாத்து மற்றும் நீர்." }
    },

    // --- ORANGE ---
    {
        id: 'orange_haunglongbing',
        crop: 'Orange',
        name: { en: "Orange - Huanglongbing (Greening)", ta: "ஆரஞ்சு - சிட்ரஸ் கிரீனிங்" },
        isHealthy: false,
        severity: 'Critical',
        symptoms: { en: "Yellow mottling on leaves. Misshapen, bitter fruit.", ta: "இலைகளில் மஞ்சள் நிறத் திட்டுகள். வடிவமற்ற, கசப்பான பழம்." },
        cause: { en: "Bacteria: Candidatus Liberibacter (Spread by Psyllids)", ta: "பாக்டீரியா (சில்லிட் பூச்சிகளால் பரவுகிறது)" },
        remedy_organic: { en: "Remove infected trees immediately to save others.", ta: "மற்ற மரங்களைக் காப்பாற்ற பாதிக்கப்பட்ட மரங்களை உடனடியாக அகற்றவும்." },
        remedy_chemical: { en: "Control psyllids with insecticides.", ta: "பூச்சிக்கொல்லிகள் மூலம் சில்லிட் பூச்சிகளைக் கட்டுப்படுத்தவும்." },
        prevention: { en: "Use disease-free nursery stock.", ta: "நோய் இல்லாத நாற்றுகளைப் பயன்படுத்தவும்." }
    },

    // --- PEACH ---
    {
        id: 'peach_bacterial_spot',
        crop: 'Peach',
        name: { en: "Peach - Bacterial Spot", ta: "பீச் - பாக்டீரியா புள்ளி" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Small water-soaked spots on leaves turning holey (shot-hole).", ta: "இலைகளில் சிறிய நீர் ஊறிய புள்ளிகள் துளைகளாக மாறும்." },
        cause: { en: "Bacteria: Xanthomonas campestris", ta: "பாக்டீரியா: சாந்தோமோனாஸ் கேம்பஸ்ட்ரிஸ்" },
        remedy_organic: { en: "Copper sprays in fall/early spring.", ta: "இலையுதிர்/வசந்த காலத்தின் துவக்கத்தில் காப்பர் தெளிப்பு." },
        remedy_chemical: { en: "Copper or Oxytetracycline.", ta: "காப்பர் அல்லது ஆக்ஸிடெட்ராசைக்ளின்." },
        prevention: { en: "Select resistant varieties.", ta: "எதிர்ப்பு ரகங்களைத் தேர்ந்தெடுக்கவும்." }
    },
    {
        id: 'peach_healthy',
        crop: 'Peach',
        name: { en: "Peach - Healthy", ta: "பீச் - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Tree appears vigorous.", ta: "மரம் வீரியமாகத் தெரிகிறது." },
        remedy: { en: "Routine care.", ta: "வழக்கமான பராமரிப்பு." }
    },

    // --- PEPPER (BELL) ---
    {
        id: 'pepper_bacterial_spot',
        crop: 'Pepper',
        name: { en: "Pepper - Bacterial Spot", ta: "குடைமிளகாய் - பாக்டீரியா புள்ளி" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Small water-soaked spots on leaves/fruit. Leaf drop.", ta: "இலைகள்/பழங்களில் சிறிய நீர் ஊறிய புள்ளிகள். இலை உதிர்தல்." },
        cause: { en: "Bacteria: Xanthomonas euvesicatoria", ta: "பாக்டீரியா: சாந்தோமோனாஸ் யூவெசிகேடோரியா" },
        remedy_organic: { en: "Copper sprays.", ta: "காப்பர் தெளிப்பு." },
        remedy_chemical: { en: "Copper + Mancozeb.", ta: "காப்பர் + மன்கோசெப்." },
        prevention: { en: "Use treated seeds.", ta: "நேர்த்தி செய்யப்பட்ட விதைகளைப் பயன்படுத்தவும்." }
    },
    {
        id: 'pepper_healthy',
        crop: 'Pepper',
        name: { en: "Pepper - Healthy", ta: "குடைமிளகாய் - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Plants are green and productive.", ta: "செடிகள் பச்சையாகவும் விளைச்சல் தருவதாகவும் உள்ளன." },
        remedy: { en: "Water regularly.", ta: "வழக்கமாக தண்ணீர் பாய்ச்சவும்." }
    },

    // --- RASPBERRY ---
    {
        id: 'raspberry_healthy',
        crop: 'Raspberry',
        name: { en: "Raspberry - Healthy", ta: "ராஸ்பெர்ரி - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Canes and leaves look good.", ta: "தண்டுகளும் இலைகளும் நன்றாக உள்ளன." },
        remedy: { en: "Prune old canes.", ta: "பழைய தண்டுகளை கவாத்து செய்யவும்." }
    },

    // --- SOYBEAN ---
    {
        id: 'soybean_healthy',
        crop: 'Soybean',
        name: { en: "Soybean - Healthy", ta: "சோயாபீன் - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "No disease signs.", ta: "நோய் அறிகுறிகள் இல்லை." },
        remedy: { en: "Maintain soil health.", ta: "மண் வளத்தைப் பராமரிக்கவும்." }
    },

    // --- SQUASH ---
    {
        id: 'squash_powdery_mildew',
        crop: 'Squash',
        name: { en: "Squash - Powdery Mildew", ta: "பரங்கி - சாம்பல் நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "White powdery spots on leaves and stems.", ta: "இலைகள் மற்றும் தண்டுகளில் வெள்ளை தூள் போன்ற புள்ளிகள்." },
        cause: { en: "Fungus: Podosphaera xanthii", ta: "பூஞ்சை: போடோஸ்பேரா சாந்தி" },
        remedy_organic: { en: "Neem oil or baking soda spray.", ta: "வேப்ப எண்ணெய் அல்லது சமையல் சோடா தெளிப்பு." },
        remedy_chemical: { en: "Fungicides like Chlorothalonil.", ta: "குளோரோதலோனில் போன்ற பூஞ்சைக் கொல்லிகள்." },
        prevention: { en: "Plant resistant varieties.", ta: "எதிர்ப்பு ரகங்களை நடவு செய்யவும்." }
    },

    // --- STRAWBERRY ---
    {
        id: 'strawberry_leaf_scorch',
        crop: 'Strawberry',
        name: { en: "Strawberry - Leaf Scorch", ta: "ஸ்ட்ராபெர்ரி - இலை கருகல்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Irregular purple blotches on leaves.", ta: "இலைகளில் ஒழுங்கற்ற ஊதா நிறத் திட்டுகள்." },
        cause: { en: "Fungus: Diplocarpon earliana", ta: "பூஞ்சை: டிப்ளோகார்பன் எர்லியானா" },
        remedy_organic: { en: "Remove infected leaves.", ta: "பாதிக்கப்பட்ட இலைகளை அகற்றவும்." },
        remedy_chemical: { en: "Captan or Copper fungicides.", ta: "கேப்டன் அல்லது காப்பர் பூஞ்சைக் கொல்லிகள்." },
        prevention: { en: "Ensure good drainage.", ta: "நல்ல வடிகால் வசதியை உறுதி செய்யவும்." }
    },
    {
        id: 'strawberry_healthy',
        crop: 'Strawberry',
        name: { en: "Strawberry - Healthy", ta: "ஸ்ட்ராபெர்ரி - ஆரோக்கியமானது" },
        isHealthy: true,
        severity: 'Low',
        symptoms: { en: "Vibrant green leaves.", ta: "துடிப்பான பச்சை இலைகள்." },
        remedy: { en: "Keep bed weed-free.", ta: "படுக்கையை களை இல்லாமல் வைத்திருக்கவும்." }
    },

    // --- TOMATO (Additions) ---
    {
        id: 'tomato_bacterial_spot',
        crop: 'Tomato',
        name: { en: "Tomato - Bacterial Spot", ta: "தக்காளி - பாக்டீரியா புள்ளி" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Small water-soaked spots, turning dark. Fruit spots are scabby.", ta: "சிறிய நீர் ஊறிய புள்ளிகள், கருமையாக மாறும். பழப் புள்ளிகள் சொரசொரப்பாக இருக்கும்." },
        cause: { en: "Bacteria: Xanthomonas", ta: "பாக்டீரியா: சாந்தோமோனாஸ்" },
        remedy_organic: { en: "Copper sprays.", ta: "காப்பர் தெளிப்பு." },
        remedy_chemical: { en: "Copper + Mancozeb.", ta: "காப்பர் + மன்கோசெப்." },
        prevention: { en: "Seed treatment.", ta: "விதை நேர்த்தி." }
    },
    {
        id: 'tomato_leaf_mold',
        crop: 'Tomato',
        name: { en: "Tomato - Leaf Mold", ta: "தக்காளி - இலை பூஞ்சை" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Pale yellow spots on upper leaf, olive mold on underside.", ta: "இலையின் மேல் பகுதியில் வெளிறிய மஞ்சள் புள்ளிகள், அடியில் ஆலிவ் நிற பூஞ்சை." },
        cause: { en: "Fungus: Passalora fulva", ta: "பூஞ்சை: பாசலோரா ஃபுல்வா" },
        remedy_organic: { en: "Improve airflow. Copper spray.", ta: "காற்று ஓட்டத்தை மேம்படுத்தவும். காப்பர் தெளிப்பு." },
        remedy_chemical: { en: "Chlorothalonil or Mancozeb.", ta: "குளோரோதலோனில் அல்லது மன்கோசெப்." },
        prevention: { en: "Ventilate greenhouses.", ta: "பசுமைக்குடில்களில் காற்றோட்டம் அமைக்கவும்." }
    },
    {
        id: 'tomato_septoria_leaf_spot',
        crop: 'Tomato',
        name: { en: "Tomato - Septoria Spot", ta: "தக்காளி - செப்டோரியா இலை புள்ளி" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Circular spots with gray center and dark margin.", ta: "சாம்பல் மைய மற்றும் அடர் விளிம்புடன் கூடிய வட்ட வடிவ புள்ளிகள்." },
        cause: { en: "Fungus: Septoria lycopersici", ta: "பூஞ்சை: செப்டோரியா லைகோபெர்சிகிய்" },
        remedy_organic: { en: "Remove lower leaves.", ta: "கீழ் இலைகளை அகற்றவும்." },
        remedy_chemical: { en: "Chlorothalonil spray.", ta: "குளோரோதலோனில் தெளிப்பு." },
        prevention: { en: "Crop rotation.", ta: "பயிர் சுழற்சி." }
    },
    {
        id: 'tomato_spider_mites_two_spotted_spider_mite',
        crop: 'Tomato',
        name: { en: "Tomato - Spider Mite", ta: "தக்காளி - சிலந்திப் பூச்சி" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Tiny yellow speckles. Fine webbing.", ta: "சிறிய மஞ்சள் புள்ளிகள். மெல்லிய வலை." },
        cause: { en: "Pest: Tetranychus urticae", ta: "பூச்சி: டெட்ரானிகஸ் உர்டிகே" },
        remedy_organic: { en: "Neem oil or insecticidal soap.", ta: "வேப்ப எண்ணெய் அல்லது பூச்சிக்கொல்லி சோப்பு." },
        remedy_chemical: { en: "Abamectin or Spiromesifen.", ta: "அபாமிக்கின் அல்லது ஸ்பிரோமெசிஃபென்." },
        prevention: { en: "Avoid dusty conditions.", ta: "தூசி நிறைந்த சூழலைத் தவிர்க்கவும்." }
    },
    {
        id: 'tomato_target_spot',
        crop: 'Tomato',
        name: { en: "Tomato - Target Spot", ta: "தக்காளி - இலக்கு புள்ளி நோய்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Bullseye-like spots on leaves.", ta: "இலைகளில் காளைக்கண் போன்ற புள்ளிகள்." },
        cause: { en: "Fungus: Corynespora cassiicola", ta: "பூஞ்சை: கோரினெஸ்போரா காசிகோலா" },
        remedy_organic: { en: "Copper fungicides.", ta: "காப்பர் பூஞ்சைக் கொல்லிகள்." },
        remedy_chemical: { en: "Chlorothalonil or Azoxystrobin.", ta: "குளோரோதலோனில் அல்லது அசோக்ஸிஸ்ட்ரோபின்." },
        prevention: { en: "Remove residues.", ta: "பயிர் கழிவுகளை அகற்றவும்." }
    },
    {
        id: 'tomato_tomato_yellow_leaf_curl_virus',
        crop: 'Tomato',
        name: { en: "Tomato - Yellow Leaf Curl", ta: "தக்காளி - மஞ்சள் இலை சுருள் வைரஸ்" },
        isHealthy: false,
        severity: 'High',
        symptoms: { en: "Upward curling leaves, yellow margins. Stunting.", ta: "மேல்நோக்கி சுருண்ட இலைகள், மஞ்சள் விளிம்புகள். வளர்ச்சி குன்றுதல்." },
        cause: { en: "Virus (Spread by Whitefly)", ta: "வைரஸ் (வெள்ளை ஈக்களால் பரவுகிறது)" },
        remedy_organic: { en: "Use virus-resistant seeds.", ta: "வைரஸ் எதிர்ப்பு விதைகளைப் பயன்படுத்தவும்." },
        remedy_chemical: { en: "Control whiteflies with Imidacloprid.", ta: "இமிடாக்குளோபிரிட் மூலம் வெள்ளை ஈக்கலைக் கட்டுப்படுத்தவும்." },
        prevention: { en: "Reflective mulches.", ta: "பிரதிபலிக்கும் மூடாக்கு." }
    },
    {
        id: 'tomato_tomato_mosaic_virus',
        crop: 'Tomato',
        name: { en: "Tomato - Mosaic Virus", ta: "தக்காளி - மொசைக் வைரஸ்" },
        isHealthy: false,
        severity: 'Medium',
        symptoms: { en: "Mottled light/dark green leaves.", ta: "திட்டுத் திட்டான வெளிர்/அடர் பச்சை இலைகள்." },
        cause: { en: "Virus (Mechanically transmitted)", ta: "வைரஸ் (தொடுதல் மூலம் பரவுகிறது)" },
        remedy_organic: { en: "Remove infected plants. Wash hands/tools.", ta: "பாதிக்கப்பட்ட செடிகளை அகற்றவும். கைகள்/கருவிகளைக் கழுவவும்." },
        remedy_chemical: { en: "No cure.", ta: "தீர்வு இல்லை." },
        prevention: { en: "Sanitation.", ta: "சுத்தத்தைப் பேணவும்." }
    }
];
