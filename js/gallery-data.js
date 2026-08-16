const galleryData = [
  /* 1. PORTRAITS */
  {
    id: "img-1",
    title: "Portrait of Soul & Precision",
    category: "portraits",
    type: "image",
    src: "assets/images/indian_portrait.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.4",
      shutter: "1/500s",
      iso: "ISO 100",
      location: "Pune Studio, India",
      story: "Captured in native 2:3 vertical frame with razor-sharp focus on eye texture and dramatic split lighting. The 85mm f/1.4 rendering creates an immediate emotional connection."
    }
  },
  {
    id: "img-1b",
    title: "Studio Ambient & Executive Fine Art",
    category: "portraits",
    type: "image",
    src: "assets/images/portrait_landscape.png",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.8",
      shutter: "1/250s",
      iso: "ISO 160",
      location: "Pune Fine Art Studio",
      story: "Native 3:2 horizontal sensor capture. Warm environmental lighting highlights authentic posture, tactile textures, and creamy background falloff."
    }
  },

  /* 2. WEDDINGS */
  {
    id: "img-2",
    title: "Wedding Story 1 - Vivah Rituals & Joy",
    category: "weddings",
    type: "image",
    src: "assets/images/weddings/wedding1/Wedding (10).jpg",
    aspectRatio: "3:2",
    orientation: "landscape",
    flipbookUrl: "https://royal-digital-flip-album.vercel.app/",
    exif: {
      camera: "Nikon Z6III",
      lens: "Tamron 28-75mm f/2.8 G2",
      aperture: "f/2.8",
      shutter: "1/400s",
      iso: "ISO 100",
      location: "Pune, Maharashtra",
      story: "Original click by Dipak More in native 3:2 landscape framing capturing sacred wedding moments."
    }
  },
  {
    id: "img-2b",
    title: "Wedding Story 1 - Bride Portrait (85mm)",
    category: "weddings",
    type: "image",
    src: "assets/images/weddings/wedding1/Wedding (12).jpg",
    aspectRatio: "2:3",
    orientation: "portrait",
    flipbookUrl: "https://royal-digital-flip-album.vercel.app/",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.8",
      shutter: "1/500s",
      iso: "ISO 100",
      location: "Pune, Maharashtra",
      story: "Uncropped 2:3 vertical frame capturing the bride in traditional saree with 85mm optical background blur."
    }
  },

  /* 3. AI EDITS & RETOUCHING */
  {
    id: "img-3",
    title: "AI Fine Art & Retouching Transformation",
    category: "ai-edits",
    type: "image",
    src: "assets/images/ai_edits.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III & ComfyUI Engine",
      lens: "Generative Relighting & Retouching",
      aperture: "Virtual f/1.4",
      shutter: "AI Pipeline",
      iso: "Master Retouch",
      location: "AI Motion & Editing Lab",
      story: "Advanced AI skin retouching, background digital painting, and dynamic relighting while preserving 100% facial identity in native 2:3 vertical orientation."
    }
  },
  {
    id: "img-3b",
    title: "Generative Relighting & Split Retouching",
    category: "ai-edits",
    type: "image",
    src: "assets/images/ai_edits_landscape.png",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III & AI Pipeline",
      lens: "ComfyUI Neural Relighting",
      aperture: "Virtual f/2.0",
      shutter: "Generative Render",
      iso: "HDR Master",
      location: "Visual AI Lab, Pune",
      story: "Wide 3:2 landscape split concept illustrating before/after skin detail preservation, color grading curves, and generative studio backdrop synthesis."
    }
  },

  /* 4. LANDSCAPES */
  {
    id: "img-4",
    title: "Majestic Sahyadri Sunrise",
    category: "landscape",
    type: "image",
    src: "assets/images/landscape.png",
    aspectRatio: "16:9",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Ultra-Wide 16-35mm",
      aperture: "f/8.0",
      shutter: "1/60s",
      iso: "ISO 64",
      location: "Western Ghats Sahyadri Range, Maharashtra",
      story: "16:9 wide panoramic sunrise over mist-shrouded peaks of Sahyadri. High dynamic range landscape optics."
    }
  },
  {
    id: "img-4b",
    title: "Sahyadri Mist & Cascading Waterfall",
    category: "landscape",
    type: "image",
    src: "assets/images/landscape_portrait.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "16-35mm Wide Zoom",
      aperture: "f/11",
      shutter: "1/15s",
      iso: "ISO 64",
      location: "Lonavala Valley, Western Ghats",
      story: "Native 2:3 vertical landscape composition capturing the scale of roaring monsoon waterfalls plunging down emerald mountain cliffs."
    }
  },

  /* 5. BIRDING & NATURE (WILDLIFE) */
  {
    id: "img-5",
    title: "Purple-Rumped Sunbird - Tulip Tree Nectar Feed",
    category: "wildlife",
    type: "image",
    src: "assets/images/wildlife.png",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Telephoto Optics",
      aperture: "f/2.8",
      shutter: "1/1600s",
      iso: "ISO 200",
      location: "Pune, Maharashtra, India",
      story: "Original birding click by Dipak More in 3:2 landscape format. Purple-rumped Sunbird perching amidst vibrant red African Tulip Tree blossoms."
    }
  },
  {
    id: "img-5b",
    title: "Asian Kingfisher - Bamboo Perch",
    category: "wildlife",
    type: "image",
    src: "assets/images/wildlife_portrait.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Telephoto Optics 400mm",
      aperture: "f/4.0",
      shutter: "1/2000s",
      iso: "ISO 400",
      location: "Pashan Lake, Pune",
      story: "Native 2:3 vertical telephoto frame. Pin-sharp iridescent feathers and eye reflections of an Asian Kingfisher poised for action."
    }
  },

  /* 6. FAMILY */
  {
    id: "img-6",
    title: "Golden Hour Heritage Connection",
    category: "family",
    type: "image",
    src: "assets/images/indian_family.png",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Tamron 28-75mm f/2.8 G2",
      aperture: "f/2.8",
      shutter: "1/800s",
      iso: "ISO 200",
      location: "Pune Countryside, Maharashtra",
      story: "Native 3:2 landscape framing celebrating warmth and love. Sunset rim lighting highlights traditional Maharashtrian attire and genuine candid smiles."
    }
  },
  {
    id: "img-6b",
    title: "Maharashtrian Heritage Family Portrait",
    category: "family",
    type: "image",
    src: "assets/images/family_portrait.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/2.0",
      shutter: "1/500s",
      iso: "ISO 160",
      location: "Heritage Farmhouse, Pune",
      story: "Native 2:3 vertical family portrait. Beautiful golden hour glow accentuating natural joy and family bonds."
    }
  },

  /* 7. KIDS */
  {
    id: "img-7",
    title: "Pure Innocence & Smiles",
    category: "kids",
    type: "image",
    src: "assets/images/kids/kid (1).jpg",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.8",
      shutter: "1/1000s",
      iso: "ISO 100",
      location: "Pune, Maharashtra",
      story: "Original click by Dipak More in native 2:3 vertical portrait perspective. Fast shutter speed combined with creamy 85mm background blur."
    }
  },
  {
    id: "img-7b",
    title: "Outdoor Garden Play & Laughter",
    category: "kids",
    type: "image",
    src: "assets/images/kids/kid (10).jpg",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Tamron 28-75mm f/2.8 G2",
      aperture: "f/2.5",
      shutter: "1/800s",
      iso: "ISO 200",
      location: "Pune Outdoor Park",
      story: "Original click by Dipak More in wide 3:2 landscape framing. Capturing candid play and cheerful expressions in natural sunlight."
    }
  },

  /* 8. DEVOTIONAL AI */
  {
    id: "img-8",
    title: "Mauli - Divine Grace of Lord Vitthal",
    category: "devotional",
    type: "image",
    src: "assets/images/vitthal_art.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III & AI Workflow",
      lens: "ComfyUI & Custom LoRA",
      aperture: "Virtual f/1.8",
      shutter: "Digital Capture",
      iso: "ISO 100 Equivalent",
      location: "Pandharpur Devotional Series",
      story: "Inspired by Marathi Abhang in native 2:3 vertical frame. Blending photography principles with advanced AI devotional art generation."
    }
  },
  {
    id: "img-8b",
    title: "Pandharpur Wari Devotional Procession",
    category: "devotional",
    type: "image",
    src: "assets/images/devotional_landscape.png",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III & AI Pipeline",
      lens: "WAN 2.2 Visual Pipeline",
      aperture: "Virtual f/2.8",
      shutter: "Digital Rendering",
      iso: "ISO 200",
      location: "Pandharpur Pilgrim Route",
      story: "Native 3:2 landscape composition depicting Varkari pilgrims carrying saffron flags at sunset with a glowing divine background."
    }
  },
  {
    id: "img-8c",
    title: "Lord Krishna Moonlight Flute Fine Art",
    category: "devotional",
    type: "image",
    src: "assets/images/krishna_art.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "AI Motion Lab & ComfyUI",
      lens: "Cosmic Lighting Engine",
      aperture: "Virtual f/1.4",
      shutter: "Digital Master",
      iso: "ISO 100",
      location: "Mythological Fine Art Series",
      story: "Enchanting vertical 2:3 devotional portrait of Lord Krishna under moonlit Vrindavan skies with ethereal peacock feather details."
    }
  },

  /* 9. CINEMATIC CINEMA */
  {
    id: "img-10",
    title: "Echoes in the Stone Corridor",
    category: "cinematic",
    type: "image",
    src: "assets/images/cinematic_story.png",
    aspectRatio: "3:2",
    orientation: "landscape",
    exif: {
      camera: "Nikon Z6III",
      lens: "Tamron 28-75mm f/2.8 G2",
      aperture: "f/2.0",
      shutter: "1/160s",
      iso: "ISO 400",
      location: "Heritage Temple, Maharashtra",
      story: "Native 3:2 landscape composition. Volumetric sunbeams filtering through ancient stone archways, color graded with 35mm film emulation curves."
    }
  },
  {
    id: "img-10b",
    title: "Volumetric Light & Sacred Temple Archway",
    category: "cinematic",
    type: "image",
    src: "assets/images/cinematic_portrait.png",
    aspectRatio: "2:3",
    orientation: "portrait",
    exif: {
      camera: "Nikon Z6III",
      lens: "Sirui Aurora 85mm f/1.4",
      aperture: "f/1.8",
      shutter: "1/200s",
      iso: "ISO 320",
      location: "Sacred Stone Temple, Maharashtra",
      story: "Native 2:3 vertical cinematic frame capturing dramatic god-rays piercing through carved stone pillars."
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
    aspectRatio: "16:9",
    orientation: "landscape",
    pipelineBadges: ["Devotional Song", "WAN 2.2", "16:9 HD"],
    exif: {
      camera: "WAN 2.2 & Audio-Sync Motion",
      lens: "Full Devotional Track",
      aperture: "24fps Cinematic",
      shutter: "Audio Responsive",
      iso: "4K Master",
      location: "Pandharpur Wari Series",
      story: "Full-length Marathi Abhang devotional video song in 16:9 format with animated visual layers and synchronized chanting audio."
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
    aspectRatio: "9:16",
    orientation: "portrait",
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
    title: "॥ श्री षोडशबाहु नरसिंहाष्टकम् ॥ Powerful Narasimha Stotram | AI Animated 4K | Sri Vijayeendra Tirtha",
    category: "ai-video",
    videoSubtype: "song",
    type: "video",
    src: "assets/images/ai_video_thumb.png",
    youtubeId: "AF3Ojhw9nV8",
    aspectRatio: "16:9",
    orientation: "landscape",
    pipelineBadges: ["Devotional Stotram", "AI Animated 4K", "Veo & ComfyUI"],
    exif: {
      camera: "Veo, ComfyUI & WAN 2.2 Pipeline",
      lens: "4K Cinematic Motion Interpolation",
      aperture: "Motion Lock / 60fps",
      shutter: "Audio Chanting Synchronized",
      iso: "HDR 4K Master",
      location: "Mythological AI Cinema",
      story: "Powerful Sri Shodashabahu Narasimha Ashtakam stotram composed by Sri Vijayeendra Tirtha, rendered in AI Animated 4K motion cinema with facial identity preservation and cosmic energy dynamics."
    }
  }
];

const gearData = [
  {
    name: "Nikon Z6III Mirrorless Body",
    type: "Primary Camera",
    specs: "24.5 MP Partially-Stacked CMOS | Native 3:2 FX Sensor | 6K RAW",
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
