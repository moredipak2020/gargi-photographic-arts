const galleryData = [
  {
    id: "img-1",
    title: "Portrait of Soul & Precision",
    category: "portraits",
    type: "image",
    src: "assets/images/indian_portrait.png",
    aspectRatio: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.4",
      shutter: "1/500s",
      iso: "ISO 100",
      location: "Pune Studio, India",
      story: "Captured with razor-sharp focus on eye texture and dramatic split lighting. The 85mm f/1.4 wide open rendering creates an immediate emotional connection."
    }
  },
  {
    id: "img-2",
    title: "Royal Wedding Reception & Heritage",
    category: "weddings",
    type: "image",
    src: "assets/images/wedding.png",
    aspectRatio: "landscape",
    flipbookUrl: "https://royal-digital-flip-album.vercel.app/",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4 & 28-75mm f/2.8",
      aperture: "f/2.0",
      shutter: "1/250s",
      iso: "ISO 400",
      location: "Grand Heritage Resort, Pune",
      story: "Royal Indian wedding reception ceremony. Includes a complimentary hosted Royal Digital 3D Flipbook album."
    }
  },
  {
    id: "img-3",
    title: "AI Fine Art & Retouching Transformation",
    category: "ai-edits",
    type: "image",
    src: "assets/images/ai_edits.png",
    aspectRatio: "portrait",
    exif: {
      camera: "Nikon Z6III & ComfyUI Engine",
      lens: "Generative Relighting & Retouching",
      aperture: "Virtual f/1.4",
      shutter: "AI Pipeline",
      iso: "Master Retouch",
      location: "AI Motion & Editing Lab",
      story: "Advanced AI skin retouching, background digital painting, and dynamic relighting while preserving 100% facial identity."
    }
  },
  {
    id: "img-4",
    title: "Majestic Sahyadri Sunrise",
    category: "landscape",
    type: "image",
    src: "assets/images/landscape.png",
    aspectRatio: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Ultra-Wide 16-35mm",
      aperture: "f/8.0",
      shutter: "1/60s",
      iso: "ISO 64",
      location: "Western Ghats Sahyadri Range, Maharashtra",
      story: "Golden morning mist rising over the lush rolling hills of the Western Ghats. Ultra-wide optical dynamic range capture."
    }
  },
  {
    id: "img-5",
    title: "Purple-Rumped Sunbird - African Tulip Tree Nectar Feed",
    category: "wildlife",
    type: "image",
    src: "assets/images/wildlife.png",
    aspectRatio: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Telephoto Optics",
      aperture: "f/2.8",
      shutter: "1/1600s",
      iso: "ISO 200",
      location: "Pune, Maharashtra, India",
      story: "Original birding click by Dipak More (Gargi Photographic Arts). Purple-rumped Sunbird perching amidst vibrant red African Tulip Tree blossoms (Spathodea campanulata)."
    }
  },
  {
    id: "img-6",
    title: "Golden Hour Heritage Connection",
    category: "family",
    type: "image",
    src: "assets/images/indian_family.png",
    aspectRatio: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Tamron 28-75mm f/2.8 G2",
      aperture: "f/2.8",
      shutter: "1/800s",
      iso: "ISO 200",
      location: "Pune Countryside, Maharashtra",
      story: "Celebrating warmth and love. Sunset rim lighting highlights traditional Maharashtrian attire and genuine candid smiles."
    }
  },
  {
    id: "img-7",
    title: "Joyful Moments - Childhood Smiles",
    category: "kids",
    type: "image",
    src: "assets/images/indian_kids.png",
    aspectRatio: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.8",
      shutter: "1/1000s",
      iso: "ISO 160",
      location: "Outdoor Garden, Pune",
      story: "Candid laughter and pure innocence. Fast shutter speed combined with creamy 85mm background blur captures authentic childhood magic."
    }
  },
  {
    id: "img-8",
    title: "Mauli - Divine Grace of Lord Vitthal",
    category: "devotional",
    type: "image",
    src: "assets/images/vitthal_art.png",
    aspectRatio: "portrait",
    exif: {
      camera: "Nikon Z6III & AI Workflow",
      lens: "ComfyUI & Custom LoRA",
      aperture: "Virtual f/1.8",
      shutter: "Digital Capture",
      iso: "ISO 100 Equivalent",
      location: "Pandharpur Devotional Visual Series",
      story: "Inspired by Marathi Abhang and the sacred Pandharpur Wari pilgrimage. Blending photography principles with advanced AI devotional art generation."
    }
  },
  {
    id: "img-10",
    title: "Echoes in the Stone Corridor",
    category: "cinematic",
    type: "image",
    src: "assets/images/cinematic_story.png",
    aspectRatio: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Tamron 28-75mm f/2.8 G2",
      aperture: "f/2.0",
      shutter: "1/160s",
      iso: "ISO 400",
      location: "Heritage Temple, Maharashtra",
      story: "Dramatic volumetric sunbeams filtering through ancient stone archways. Colored with cinematic 35mm film emulation curves."
    }
  },

  /* Video Showcase Items */
  {
    id: "vid-1",
    title: "Lord Vitthal Devotional Abhang Video Song",
    category: "ai-video",
    videoSubtype: "song",
    type: "video",
    src: "assets/images/vitthal_art.png",
    youtubeId: "dQw4w9WgXcQ",
    aspectRatio: "landscape",
    pipelineBadges: ["Devotional Song", "WAN 2.2", "4K Video"],
    exif: {
      camera: "WAN 2.2 & Audio-Sync Motion",
      lens: "Full Devotional Track",
      aperture: "24fps Cinematic",
      shutter: "Audio Responsive",
      iso: "4K Master",
      location: "Pandharpur Wari Series",
      story: "Full-length Marathi Abhang devotional video song with animated visual layers and synchronized chanting audio."
    }
  },
  {
    id: "vid-2",
    title: "Lord Krishna Moonlight Flute - YouTube Shorts",
    category: "ai-video",
    videoSubtype: "shorts",
    type: "video",
    src: "assets/images/krishna_art.png",
    youtubeId: "dQw4w9WgXcQ",
    aspectRatio: "shorts",
    pipelineBadges: ["YouTube Shorts", "9:16 Vertical", "LTX Video"],
    exif: {
      camera: "LTX Video Vertical Motion",
      lens: "9:16 Reels / Shorts Format",
      aperture: "Vertical Cinema",
      shutter: "Looping Motion",
      iso: "HDR Vertical",
      location: "Social Motion Lab",
      story: "Optimized 9:16 vertical AI video short engineered for high engagement on YouTube Shorts and Instagram Reels."
    }
  },
  {
    id: "vid-3",
    title: "Lord Narasimha Cosmic Avatar Motion",
    category: "ai-video",
    videoSubtype: "motion",
    type: "video",
    src: "assets/images/ai_video_thumb.png",
    youtubeId: "dQw4w9WgXcQ",
    aspectRatio: "landscape",
    pipelineBadges: ["Motion Cinema", "ComfyUI", "Veo Pipeline"],
    exif: {
      camera: "Veo & ComfyUI Pipeline",
      lens: "Cosmic Motion Interpolation",
      aperture: "Motion Lock",
      shutter: "1/1000s Render",
      iso: "HDR Master",
      location: "Mythological AI Cinema",
      story: "Dynamic motion animation generated from static concept art, maintaining facial identity and cosmic energy glows."
    }
  }
];

const gearData = [
  {
    name: "Nikon Z6III Mirrorless Body",
    type: "Primary Camera",
    specs: "24.5 MP Partially-Stacked CMOS | 120 fps continuous | 6K RAW Video",
    description: "The workhorse body delivering stunning dynamic range, low-light performance, and ultra-fast autofocus for weddings, portraits, birding, and cinematic scenes."
  },
  {
    name: "Sirui Aurora 85mm f/1.4",
    type: "Portrait Prime Lens",
    specs: "Full-Frame | Ultra-Fast f/1.4 Aperture | 13-Blade Circular Iris",
    description: "My go-to portrait & wedding glass. Renders buttery smooth background bokeh, razor-sharp eye detail, and exquisite skin tones."
  },
  {
    name: "Tamron 28-75mm f/2.8 Di III VXD G2",
    type: "Standard Zoom Lens",
    specs: "Constant f/2.8 | VXD Linear Motor | Compact Lightweight Design",
    description: "Versatile documentary, wedding reception, landscape, and family portrait lens. Fast tracking performance."
  },
  {
    name: "ComfyUI, WAN 2.2 & Digital Flipbook Stack",
    type: "AI Motion & Interactive Albums",
    specs: "Vercel Hosted Flipbook | 9:16 Shorts | 16:9 Video Songs",
    description: "Generative AI video pipelines combined with interactive 3D digital flipbook wedding albums hosted on Vercel/Cloudflare edge servers."
  }
];
