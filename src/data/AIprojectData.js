export const aiProjectRecords = {
  "game-popular-gameplay-classification": {
    slug: "game-popular-gameplay-classification",
    title: "Proyek klasifikasi Gambar: Game Popular Gameplay Classification",
    category: "AI",
    image: "/images/projects/klasifikasigambargame/klasifikasigambargame.webp",
    descriptionTitle: "📝 Deskripsi Proyek",
    outcomeTitle: "🏆 Hasil Proyek (Key Metrics & Deliverables)",
    scopeTitle: "🛠️ Peran & Tanggung Jawab (What You Did)",
    stackTitle: "💻 Software & Tools",
    desc: {
      id: "Proyek ini adalah sistem klasifikasi gambar berbasis Deep Learning yang dirancang untuk mengidentifikasi dan mengelompokkan tangkapan layar (gameplay) dari 5 video game populer secara otomatis. Proyek ini diselesaikan menggunakan pendekatan Transfer Learning guna memastikan performa tinggi dengan waktu latih yang efisien, serta diekspor ke berbagai format distribusi modern (TF-Lite, TFJS, SavedModel) untuk mendukung deployment multiplatform (Mobile, Web, dan Edge).",
    },
    overview: {
      id: "Proyek ini adalah sistem klasifikasi gambar berbasis Deep Learning yang dirancang untuk mengidentifikasi dan mengelompokkan tangkapan layar (gameplay) dari 5 video game populer secara otomatis. Proyek ini diselesaikan menggunakan pendekatan Transfer Learning guna memastikan performa tinggi dengan waktu latih yang efisien, serta diekspor ke berbagai format distribusi modern (TF-Lite, TFJS, SavedModel) untuk mendukung deployment multiplatform (Mobile, Web, dan Edge).",
    },
    projectFacts: {
      datasetSource: "Gameplay Images (Kaggle)",
      classCount: "5 Kategori Game Utama",
      classes: [
        "God of War",
        "Fortnite",
        "Genshin Impact",
        "Apex Legends",
        "Forza Horizon",
      ],
      totalData:
        "5.000 gambar asli dengan resolusi awal tidak seragam, didistribusikan merata (masing-masing 1.000 gambar per kelas).",
      architecture:
        "MobileNetV2 (Pre-trained on ImageNet) dengan Custom Dense Head.",
    },
    projectMetrics: [
      { label: "Akurasi Evaluasi (Test Set)", value: "95.60%" },
      { label: "Loss Akhir (Test Set)", value: "0.1121" },
    ],
    projectDeliverables: [
      {
        name: "saved_model/",
        description:
          "Format asli TensorFlow SavedModel untuk sisi server/deployment awan.",
      },
      {
        name: "tflite/model.tflite & label.txt",
        description:
          "Optimasi model ringan untuk integrasi Android/iOS/IoT.",
      },
      {
        name: "tfjs_model/model.json + shards",
        description:
          "Model web terkompresi untuk eksekusi sisi klien/browser menggunakan TensorFlow.js.",
      },
      {
        name: "requirements.txt & README.md",
        description: "Dokumentasi dependensi proyek.",
      },
    ],
    scopeSections: [
      {
        title: "Data Curation & Preprocessing",
        items: [
          "Mengunduh dan menyaring dataset berkapasitas besar untuk mempertahankan 5 kelas utama secara eksklusif.",
          "Melakukan pembagian dataset secara acak dan terstruktur (random seeded splitting) dengan rasio 80% Train (4.000 gambar), 10% Validation (500 gambar), dan 10% Test (500 gambar).",
          "Membuktikan ketangguhan model terhadap variabilitas gambar asli dengan memvalidasi keberagaman dimensi (non-uniform resolution) dan variasi rotasi sampel gambar.",
          "Data Augmentation: Menerapkan taktik augmentasi real-time pada generator latihan (rotation_range=30, width/height_shift, shear_range, zoom_range, dan horizontal_flip) untuk mencegah overfitting.",
        ],
      },
      {
        title: "Model Development (Transfer Learning)",
        items: [
          "Mengintegrasikan arsitektur MobileNetV2 sebagai ekstraktor fitur inti dengan status frozen weights.",
          "Menambahkan pooling global (GlobalAveragePooling2D), regularisasi (Dropout 40%), dan layer klasifikasi Dense multi-kelas dengan aktivasi Softmax.",
        ],
      },
      {
        title: "Callbacks Implementation",
        items: [
          "Mengonfigurasi EarlyStopping berbasis akurasi validasi serta ReduceLROnPlateau untuk menurunkan learning rate secara dinamis saat grafik loss mendatar.",
        ],
      },
      {
        title: "Multi-Format Export & Inference Verification",
        items: [
          "Membangun pipeline konversi mandiri untuk mengekspor model ke format SavedModel, TF-Lite, dan TensorFlow.js.",
          "Melakukan uji coba inferensi langsung (isolated testing) menggunakan interpreter TensorFlow Lite dengan memuat file .tflite dari penyimpanan lokal untuk mensimulasikan deployment nyata.",
        ],
      },
    ],
    repo: "https://github.com/alfian8799/ProjekKlasifikasiGambar.git",
    demo: "https://colab.research.google.com/drive/1IP77zzlp86JjJgrWsUrNtLY-V1mkfsuW?usp=sharing",
    tags: ["Python 3", "TensorFlow 2.x", "Keras"],
    toolGroups: [
      { title: "Bahasa Pemrograman", items: ["Python 3"] },
      { title: "Framework Utama", items: ["TensorFlow 2.x"] },
      {
        title: "Modul Ekspor Web",
        items: ["TensorFlow.js Converter (tensorflowjs CLI)"],
      },
      {
        title: "Library Pendukung",
        items: [
          "NumPy & Pillow (Pemrosesan data array dan manipulasi gambar asli)",
          "Matplotlib (Visualisasi metrik performa & distribusi data)",
          "Kagglehub (Akuisisi dataset terotomatisasi)",
          "Zipfile & Shutil (Manajemen berkas dan otomatisasi ekspor submission)",
        ],
      },
    ],
    keywords: ["AI"],
    gallery: [
      "/images/projects/klasifikasigambargame/klasifikasigambargame1.webp",
      "/images/projects/klasifikasigambargame/klasifikasigambargame2.webp",
      "/images/projects/klasifikasigambargame/klasifikasigambargame3.webp",
      "/images/projects/klasifikasigambargame/klasifikasigambargame4.webp",
      "/images/projects/klasifikasigambargame/klasifikasigambargame5.webp",
      "/images/projects/klasifikasigambargame/klasifikasigambargame6.webp",
    ],
  },





  "hayday-sentiment-analysis": {
    slug: "hayday-sentiment-analysis",
    title:
      "Analisis Sentimen Ulasan Game Hay Day Menggunakan Machine Learning & Deep Learning",
    subtitle: "Indonesian Review Sentiment Classification",
    category: "AI",
    role: "Machine Learning & NLP Engineer",
    year: "2026",
    status: "Completed",
    image:
      "/images/projects/analisissentimenhayday/analisissentimenhayday.webp",
    desc: {
      en: "An Indonesian NLP project that classifies Hay Day Play Store reviews as positive or negative using LinearSVC and a Bidirectional LSTM.",
      id: "Proyek NLP Bahasa Indonesia untuk mengklasifikasikan ulasan Hay Day di Play Store sebagai positif atau negatif menggunakan LinearSVC dan Bidirectional LSTM.",
    },
    overview: {
      en: "Built an end-to-end sentiment analysis system for approximately 12,000 Indonesian Hay Day reviews. Reviews were labeled from their rating scores using thresholds for Positive, Neutral, and Negative sentiment, while the evaluated classification models focus on Positive and Negative sentiment.",
      id: "Membangun sistem analisis sentimen end-to-end untuk sekitar 12.000 ulasan Hay Day berbahasa Indonesia. Ulasan diberi label berdasarkan ambang batas skor rating ke dalam kelas Positif, Netral, dan Negatif, sedangkan model klasifikasi yang dievaluasi berfokus pada sentimen Positif dan Negatif.",
    },
    overviewDetail: {
      en: "The NLP preprocessing pipeline handles informal language with custom slang normalization, tokenization, contextual stopword filtering, and sentiment-lexicon integration. TF-IDF n-grams feed the classical model, while the deep-learning pipeline uses a Bidirectional LSTM. SMOTE addresses class imbalance, especially to improve detection of negative reviews.",
      id: "Pipeline preprocessing NLP menangani bahasa tidak baku melalui normalisasi slangwords berbasis kamus kustom, tokenisasi, penyaringan stopwords kontekstual, dan integrasi leksikon sentimen. Model klasik menggunakan fitur TF-IDF n-gram, sedangkan model deep learning menggunakan Bidirectional LSTM. SMOTE diterapkan untuk mengatasi ketidakseimbangan kelas, terutama untuk meningkatkan deteksi ulasan negatif.",
    },
    scopeOfWork: {
      en: [
        "Collected and prepared approximately 12,000 Play Store reviews, then labeled sentiment classes using rating thresholds.",
        "Built an end-to-end Indonesian text preprocessing pipeline: cleaning, case folding, custom slang normalization, tokenization, stopword filtering, and sentiment-lexicon integration.",
        "Engineered TF-IDF n-gram features and applied SMOTE to address class imbalance.",
        "Trained and tuned LinearSVC with GridSearchCV and designed a Bidirectional LSTM with TensorFlow.",
        "Performed prediction error analysis and visualized text data with t-SNE and Word Clouds.",
        "Prepared a unified inference pipeline for real-time testing on new text.",
      ],
      id: [
        "Mengumpulkan dan menyiapkan sekitar 12.000 ulasan Play Store, lalu memberi label kelas sentimen berdasarkan ambang batas rating.",
        "Membangun pipeline preprocessing teks Bahasa Indonesia end-to-end: cleaning, case folding, normalisasi slangwords berbasis kamus kustom, tokenisasi, penyaringan stopwords, dan integrasi leksikon sentimen.",
        "Merekayasa fitur TF-IDF n-gram dan menerapkan SMOTE untuk mengatasi ketidakseimbangan kelas.",
        "Melatih dan menyetel LinearSVC dengan GridSearchCV serta merancang Bidirectional LSTM menggunakan TensorFlow.",
        "Melakukan analisis kesalahan prediksi dan visualisasi data teks menggunakan t-SNE serta Word Cloud.",
        "Menyiapkan pipeline inferensi terpadu untuk menguji teks baru secara real-time.",
      ],
    },
    outcome: {
      en: "The best test accuracy was 85.55% with Bidirectional LSTM (80/20 split; 94.55% training accuracy). LinearSVC with TF-IDF achieved 85.28% test accuracy (80/20 split; 90.93% training accuracy) and 85.12% (70/30 split; 90.88% training accuracy). With SMOTE, LinearSVC reached 81.00% test accuracy while negative-class recall increased to 83%. A unified inference pipeline is ready to test new text in real time.",
      id: "Akurasi pengujian terbaik sebesar 85,55% dicapai Bidirectional LSTM (split 80/20; akurasi training 94,55%). LinearSVC dengan TF-IDF memperoleh akurasi pengujian 85,28% (split 80/20; akurasi training 90,93%) dan 85,12% (split 70/30; akurasi training 90,88%). Dengan SMOTE, LinearSVC memperoleh akurasi pengujian 81,00% dan recall kelas negatif meningkat menjadi 83%. Pipeline inferensi terpadu juga disiapkan untuk menguji teks baru secara real-time.",
    },
    repo: "https://github.com/alfian8799/Analisis-Sentimen-Ulasan-Game-Hay-Day.git",
    demo: "https://colab.research.google.com/drive/1AZVy1vH406RUrU9NFOzWv9sSHOXKZuOG?usp=sharing",
    tags: [
      "NLP",
      "Machine Learning",
      "Deep Learning",
      "Sentiment Analysis",
      "Python",
    ],
    stack: [
      "Python 3.13",
      "Pandas",
      "NumPy",
      "NLTK",
      "Sastrawi",
      "Scikit-learn",
      "Imbalanced-learn (SMOTE)",
      "TensorFlow",
      "Seaborn",
      "Matplotlib",
      "WordCloud",
      "t-SNE",
    ],
    keywords: ["AI"],
    gallery: [
      "/images/projects/analisissentimenhayday/analisissentimenhayday1.webp",
      "/images/projects/analisissentimenhayday/analisissentimenhayday2.webp",
      "/images/projects/analisissentimenhayday/analisissentimenhayday3.webp",
      "/images/projects/analisissentimenhayday/analisissentimenhayday4.webp",
      "/images/projects/analisissentimenhayday/analisissentimenhayday5.webp",
      "/images/projects/analisissentimenhayday/analisissentimenhayday6.webp",
    ],
  },
};
