import { CareerProps } from "../types/careers";

export const CAREERS: CareerProps[] = [
  {
    position: "Chief Technology Officer",
    company: "Lummy Ticket",
    logo: "/images/lummy-logo.png",
    location: "Indonesia",
    location_type: "Remote",
    type: "Full-time",
    start_date: "2025-04",
    end_date: null,
    industry: "Web3 / Ticketing",
    link: "https://www.instagram.com/lummy.ticket/",
    responsibilities: {
      en: [
        "Led end-to-end product development of an NFT-based ticketing platform on the Lisk blockchain.",
        "Managed a team of 4 members under technical direction while defining the product roadmap and feature priorities.",
        "Architected smart contracts using EIP-2535 Diamond Pattern (5 facets, upgradeable and modular).",
        "Coordinated weekly sprint planning and stakeholder communication; shipped MVP under fixed-timeline incubator constraints.",
      ],
      id: [
        "Memimpin pengembangan produk end-to-end platform tiket berbasis NFT di blockchain Lisk.",
        "Mengelola tim 4 orang dengan arahan teknis sekaligus menyusun product roadmap dan prioritas fitur.",
        "Mendesain smart contract menggunakan EIP-2535 Diamond Pattern (5 facets, upgradeable dan modular).",
        "Mengoordinasi sprint planning mingguan dan komunikasi stakeholder; merilis MVP di bawah constraint timeline incubator.",
      ],
    },
    lessons_learned: {
      en: [
        "Bridged business strategy and engineering execution as a founder/CTO.",
        "Operated within a Web3 incubator program with formal milestones and deliverables.",
      ],
      id: [
        "Menjembatani strategi bisnis dan eksekusi engineering sebagai founder/CTO.",
        "Beroperasi dalam program inkubator Web3 dengan milestone dan deliverable formal.",
      ],
    },
    impact: {
      en: [
        "Secured USD 4,600 grant from Lisk Spark Incubator (Indonesia's 1st government-backed Web3 program).",
        "Top 5 + Social Media Challenge winner, Lisk Builders Challenge Round One (May 2025).",
      ],
      id: [
        "Meraih grant USD 4,600 dari Lisk Spark Incubator (program Web3 pertama di Indonesia yang didukung pemerintah).",
        "Pemenang Top 5 + Social Media Challenge, Lisk Builders Challenge Round One (Mei 2025).",
      ],
    },
    isShow: true,
  },
  {
    position: "Freelance Product Developer & Consultant",
    company: "Self-employed",
    logo: "/images/careers/self-employed.jpeg",
    location: "Singapore 🇸🇬, Malaysia 🇲🇾, Australia 🇦🇺",
    location_type: "Remote",
    type: "Freelance",
    start_date: "2025-03",
    end_date: null,
    industry: "Product Development",
    link: null,
    responsibilities: {
      en: [
        "Acting as Product Manager and sole developer, delivering 6 business automation websites and 5 company profiles.",
        "Clients: Fixinguru, Sejuk, Lyqra, MM Builder & Solutions, MadeMe, Fir & Co.",
        "Leading product discovery sessions, brainstorming with clients, and designing feature sets before development.",
        "Advising on technical feasibility and shaping product direction as the decision-maker bridging business needs and technical execution.",
      ],
      id: [
        "Berperan sebagai Product Manager sekaligus developer tunggal, merilis 6 website otomasi bisnis dan 5 company profile.",
        "Klien: Fixinguru, Sejuk, Lyqra, MM Builder & Solutions, MadeMe, Fir & Co.",
        "Memimpin sesi product discovery, brainstorming dengan klien, dan merancang fitur sebelum pengembangan.",
        "Memberikan saran kelayakan teknis dan menentukan arah produk sebagai pengambil keputusan yang menjembatani kebutuhan bisnis dan eksekusi teknis.",
      ],
    },
    lessons_learned: {
      en: [
        "Managed full project lifecycle independently from requirement gathering through deployment.",
        "Sharpened ability to translate business processes into product requirements.",
      ],
      id: [
        "Mengelola siklus penuh proyek secara mandiri dari requirement gathering hingga deployment.",
        "Mengasah kemampuan menerjemahkan proses bisnis ke product requirement.",
      ],
    },
    impact: {
      en: [
        "Delivered 11+ client projects across Singapore, Malaysia, and Australia.",
        "Established trust with international clients via consistent end-to-end delivery.",
      ],
      id: [
        "Merilis 11+ proyek klien di Singapura, Malaysia, dan Australia.",
        "Membangun kepercayaan klien internasional melalui delivery end-to-end yang konsisten.",
      ],
    },
    isShow: true,
  },
  {
    position: "Web3 Developer",
    company: "Blockdev.id",
    logo: "/images/careers/blockdev.png",
    wideLogo: true,
    location: "Jakarta",
    location_type: "Onsite",
    type: "Apprenticeship",
    start_date: "2025-06",
    end_date: "2025-09",
    industry: "Web3 / Blockchain Education",
    link: "https://blockdev.id/",
    responsibilities: {
      en: [
        "Selected as 1 of 40 participants from 130+ applicants for Kelas Rutin Batch III, a 1-month intensive Web3 bootcamp.",
        "Built foundational Web3 knowledge: smart contract development, EVM internals, and DeFi protocol patterns.",
        "Shipped course projects deploying to Monad testnet using Solidity + Foundry workflow.",
      ],
      id: [
        "Terpilih sebagai 1 dari 40 peserta dari 130+ pendaftar untuk Kelas Rutin Batch III, bootcamp Web3 intensif 1 bulan.",
        "Membangun fondasi Web3: pengembangan smart contract, internals EVM, dan pola protokol DeFi.",
        "Merilis project kursus dengan deploy ke testnet Monad menggunakan workflow Solidity + Foundry.",
      ],
    },
    lessons_learned: {
      en: [
        "Practiced full Solidity + Foundry development workflow with real testnet deployments.",
        "Joined a curated Indonesian Web3 builder community.",
      ],
      id: [
        "Mempraktikkan workflow lengkap Solidity + Foundry dengan deployment ke testnet nyata.",
        "Bergabung dengan komunitas Web3 builder Indonesia yang terkurasi.",
      ],
    },
    impact: {
      en: [
        "Strengthened Web3 fundamentals applied directly to Lummy Ticket smart contract architecture.",
      ],
      id: [
        "Memperkuat fundamental Web3 yang langsung diterapkan ke arsitektur smart contract Lummy Ticket.",
      ],
    },
    isShow: true,
  },
  {
    position: "Full Stack Developer",
    company: "PT Zegen Solusi Mandiri",
    logo: "/images/zegen-logo.png",
    location: "Alam Sutera",
    location_type: "Onsite",
    type: "Full-time",
    start_date: "2025-02",
    end_date: "2026-02",
    industry: "EdTech / LMS",
    link: "https://zegen.id/compro/",
    responsibilities: {
      en: [
        "Collaborated with a cross-functional team to develop a comprehensive Learning Management System using React, Golang, and Chakra UI.",
        "Built 10+ prototype mini-projects to validate core LMS features before production implementation.",
        "Used the LMS project as foundation for undergraduate thesis research, bridging practical development with academic objectives.",
      ],
      id: [
        "Berkolaborasi dengan tim lintas fungsi untuk mengembangkan Learning Management System menggunakan React, Golang, dan Chakra UI.",
        "Membangun 10+ prototype mini-project untuk memvalidasi fitur inti LMS sebelum implementasi produksi.",
        "Menggunakan proyek LMS sebagai dasar penelitian skripsi, menjembatani pengembangan praktis dengan tujuan akademis.",
      ],
    },
    lessons_learned: {
      en: [
        "Strengthened full-stack skills across React frontend and Golang backend.",
        "Practiced design-system thinking with Chakra UI in a production codebase.",
      ],
      id: [
        "Memperkuat skill full-stack di frontend React dan backend Golang.",
        "Mempraktikkan pemikiran design-system dengan Chakra UI di codebase produksi.",
      ],
    },
    impact: {
      en: [
        "Helped ship a working LMS that became the basis of a published undergraduate thesis.",
      ],
      id: [
        "Membantu merilis LMS yang berfungsi dan menjadi dasar skripsi yang dipublikasikan.",
      ],
    },
    isShow: true,
  },
  {
    position: "SEO Backlinking Specialist",
    company: "PT Laskar Digital Indonesia",
    logo: "/images/laskar-logo.png",
    location: "Cibubur",
    location_type: "Onsite",
    type: "Part-time",
    start_date: "2021-09",
    end_date: "2022-01",
    industry: "Digital Marketing",
    link: "https://laskarseo.com/",
    responsibilities: {
      en: [
        "Contributed to ranking 40+ websites/articles on Google's first page for targeted keywords through coordinated SEO team efforts.",
        "Published 174 SEO-optimized articles and curated 150 high-authority social bookmarking websites.",
        "Used WordPress, SEOquake, Google Analytics, and Search Console to track performance and optimize results.",
      ],
      id: [
        "Berkontribusi mendongkrak 40+ website/artikel ke halaman pertama Google untuk kata kunci target melalui koordinasi tim SEO.",
        "Menerbitkan 174 artikel SEO dan kurasi 150 social bookmarking dengan otoritas tinggi.",
        "Menggunakan WordPress, SEOquake, Google Analytics, dan Search Console untuk melacak performa dan optimasi hasil.",
      ],
    },
    lessons_learned: {
      en: [
        "Hands-on understanding of how on-page and off-page SEO converts to ranking outcomes.",
      ],
      id: [
        "Pemahaman langsung bagaimana SEO on-page dan off-page berkonversi ke hasil ranking.",
      ],
    },
    impact: {
      en: [
        "Helped move 40+ pages onto the first Google SERP for prioritized keywords.",
      ],
      id: [
        "Membantu memindahkan 40+ halaman ke SERP pertama Google untuk kata kunci prioritas.",
      ],
    },
    isShow: true,
  },
  {
    position: "FILE / Filemagz Manager",
    company: "Bina Nusantara Computer Club (BNCC)",
    logo: "/images/bncc-logo.png",
    location: "Jakarta",
    location_type: "Hybrid",
    type: "Part-time",
    start_date: "2024-01",
    end_date: "2025-01",
    industry: "Student Organization",
    link: "https://bncc.net/",
    responsibilities: {
      en: [
        "Led a team of 6, managing content strategy through monthly sprints across @filemagz and @filetechno.",
        "Mentored 32 activists in content creation and video editing.",
        "Established 10+ partnerships with organizations including CTI Group, CakeResume, ToffeDev, and DevOpsDays Jakarta 2024.",
      ],
      id: [
        "Memimpin tim 6 orang, mengelola strategi konten melalui sprint bulanan di @filemagz dan @filetechno.",
        "Membimbing 32 aktivis dalam pembuatan konten dan editing video.",
        "Membangun 10+ kemitraan dengan organisasi termasuk CTI Group, CakeResume, ToffeDev, dan DevOpsDays Jakarta 2024.",
      ],
    },
    lessons_learned: {
      en: [
        "Managed cross-functional creative teams with sprint cadence and feedback loops.",
      ],
      id: [
        "Mengelola tim kreatif lintas fungsi dengan ritme sprint dan loop feedback.",
      ],
    },
    impact: {
      en: [
        "Grew followers by +2,600 across @filemagz and @filetechno.",
        "Drove record-breaking engagement: 18,000 likes on top reel, 280,000 views, 170,000 TikTok views.",
      ],
      id: [
        "Meningkatkan follower +2.600 di @filemagz dan @filetechno.",
        "Memecahkan rekor engagement: 18.000 likes di reel teratas, 280.000 views, 170.000 views TikTok.",
      ],
    },
    isShow: true,
  },
  {
    position: "Publication Coordinator",
    company: "TechnoScape 2024",
    logo: "/images/careers/technoscape.png",
    location: "Jakarta",
    location_type: "Hybrid",
    type: "Part-time",
    start_date: "2024-02",
    end_date: "2024-12",
    industry: "Student Event / Organization",
    link: "https://technoscape.id/",
    responsibilities: {
      en: [
        "Led a team of 8, managing 45+ publications across the @technoscapebncc Instagram account.",
        "Coordinated content pipeline across designers, copywriters, and editors to keep release cadence consistent.",
      ],
      id: [
        "Memimpin tim 8 orang, mengelola 45+ publikasi di akun Instagram @technoscapebncc.",
        "Mengoordinasi pipeline konten antar desainer, copywriter, dan editor untuk menjaga ritme rilis tetap konsisten.",
      ],
    },
    lessons_learned: {
      en: [
        "Sharpened ability to plan and execute multi-asset campaigns under tight event timelines.",
      ],
      id: [
        "Mengasah kemampuan merencanakan dan menjalankan kampanye multi-aset dalam timeline event yang ketat.",
      ],
    },
    impact: {
      en: [
        "Maintained a steady stream of 45+ publications throughout the event cycle, supporting overall campaign visibility.",
      ],
      id: [
        "Menjaga aliran 45+ publikasi yang stabil sepanjang siklus event, mendukung visibilitas kampanye secara keseluruhan.",
      ],
    },
    isShow: true,
  },
  {
    position: "Activist (Multiple Roles)",
    company: "Bina Nusantara Computer Club (BNCC)",
    logo: "/images/bncc-logo.png",
    location: "Jakarta",
    location_type: "Hybrid",
    type: "Part-time",
    start_date: "2022-11",
    end_date: "2023-12",
    industry: "Student Organization",
    link: "https://bncc.net/",
    responsibilities: {
      en: [
        "PRAP Project Manager: led a team of 9 in organizing a large-scale event prototype.",
        "Leadership Development Program Leader: managed an 8-member team and ensured task completion.",
        "FILE Activist Leader: led a 4-member team for weekly content production.",
        "Sponsorship Committee (BNCC Opening Season): managed sponsors and documentation.",
        "Publication Vice Coordinator (BNCC CSR 2023): edited promotional reels.",
      ],
      id: [
        "PRAP Project Manager: memimpin tim 9 orang dalam mengorganisir prototype event skala besar.",
        "Leadership Development Program Leader: mengelola tim 8 orang dan memastikan task selesai.",
        "FILE Activist Leader: memimpin tim 4 orang untuk produksi konten mingguan.",
        "Sponsorship Committee (BNCC Opening Season): mengelola sponsor dan dokumentasi.",
        "Publication Vice Coordinator (BNCC CSR 2023): mengedit reel promosi.",
      ],
    },
    lessons_learned: {
      en: [
        "Ran multiple small teams in parallel and learned to delegate while keeping quality consistent.",
      ],
      id: [
        "Menjalankan beberapa tim kecil secara paralel dan belajar mendelegasikan tugas sambil menjaga kualitas tetap konsisten.",
      ],
    },
    impact: {
      en: [
        "Delivered a working PRAP event prototype and a full LDP cycle as team leader.",
      ],
      id: [
        "Merilis prototype event PRAP yang berhasil dan menyelesaikan satu siklus LDP penuh sebagai team leader.",
      ],
    },
    isShow: true,
  },
  {
    position: "Head of Social Media",
    company: "MarshaOshi",
    logo: "/images/marshaoshi-logo.jpg",
    location: "Jakarta",
    location_type: "Remote",
    type: "Part-time",
    start_date: "2020-12",
    end_date: "2023-01",
    industry: "Entertainment / Fanbase",
    link: "https://x.com/marshaoshi_",
    responsibilities: {
      en: [
        "Led the social media team across Twitter/X, Instagram, TikTok, and Showroom Live.",
        "Owned content strategy and posting cadence across platforms.",
      ],
      id: [
        "Memimpin tim media sosial di Twitter/X, Instagram, TikTok, dan Showroom Live.",
        "Memegang strategi konten dan ritme posting lintas platform.",
      ],
    },
    lessons_learned: {
      en: [
        "Built communities from zero, with a feel for what resonates per platform.",
      ],
      id: [
        "Membangun komunitas dari nol, dengan pemahaman apa yang efektif di tiap platform.",
      ],
    },
    impact: {
      en: [
        "Grew Twitter/X from 700 to 7K followers, Instagram 0 → 1.8K, TikTok 0 → 1.6K.",
        "Averaged 527,000 tweet impressions per month during the last 5 months of tenure.",
      ],
      id: [
        "Meningkatkan Twitter/X dari 700 menjadi 7K followers, Instagram 0 → 1.8K, TikTok 0 → 1.6K.",
        "Rata-rata 527.000 tweet impression per bulan dalam 5 bulan terakhir masa jabatan.",
      ],
    },
    isShow: true,
  },
];
