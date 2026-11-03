import { useCallback, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  Wrench,
  Layers,
  ExternalLink,

} from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { ProjectImageLightbox } from "../components/ProjectImageLightbox";
import { UXCaseStudy } from "../components/UXCaseStudy";
import { useLanguage, t } from "../context/LanguageContext";
import { projectsData } from "../data/projectsData";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const openImageViewer = useCallback((image) => {
    setSelectedImage(image);
  }, []);
  const closeImageViewer = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);

  const project = projectsData[slug];

  // Helper Fallback Gambar Rusak / Tidak Ditemukan
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://placehold.co/1200x675/18181b/faf9f6?text=Image+Not+Found";
  };

  // Helper Ambil Teks Sesuai Bahasa (en/id)
  const getLocalizedText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field["id"] || field["en"] || "";
  };

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#fdfdfd] dark:bg-[#09090b]">
        <div className="text-center px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {lang === "en" ? "Project Not Found" : "Proyek Tidak Ditemukan"}
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#ff4a22] font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Projects" : "Kembali ke Proyek"}
          </Link>
        </div>
      </section>
    );
  }

  // Scope of Work List berdasarkan bahasa
  const scopeList = Array.isArray(project.scopeOfWork)
    ? project.scopeOfWork
    : project.scopeOfWork?.[lang] || project.scopeOfWork?.["id"] || [];
  const scopeSections = project.scopeSections || [];

  // Ambil 2 proyek lain untuk rekomendasi
  const otherProjects = Object.entries(projectsData)
    .filter(
      ([key, item]) =>
        key !== slug && (!project?.uxCaseStudy || item.uxCaseStudy),
    )
    .slice(0, project?.uxCaseStudy ? 1 : 2);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 py-10 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Navigasi Kembali */}
        <FadeIn>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#ff4a22] dark:hover:text-[#ff4a22] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {lang === "en" ? "Back to Projects" : "Kembali ke Proyek"}
          </Link>
        </FadeIn>

        {/* 1. Hero Header */}
        <div className="mb-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight dark:text-white mb-4">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light mb-4">
                {project.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.role && (
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff4a22] bg-[#ff4a22]/10 px-3 py-1 rounded-full font-bold">
                  {project.role}
                </span>
              )}
              {project.year && (
                <span className="text-xs font-mono text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full">
                  {project.year}
                </span>
              )}
              {project.category && (
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/60 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              )}
            </div>
          </FadeIn>
        </div>

        {/* 2. Banner Utama (Hero Image - Dinamis) */}
        <FadeIn delay={0.1}>
          <button
            type="button"
            onClick={() =>
              openImageViewer({
                src: project.image || "/images/placeholder.webp",
                alt: project.title,
              })
            }
            aria-label={
              lang === "en"
                ? `View ${project.title} image`
                : `Lihat gambar ${project.title}`
            }
            className="group relative mb-16 flex w-full cursor-zoom-in justify-center overflow-hidden rounded-2xl bg-zinc-100 text-left dark:bg-zinc-900"
          >
            <img
              src={project.image || "/images/placeholder.webp"}
              alt={project.title}
              onError={handleImageError}
              className="block h-auto w-full max-w-full object-contain"
            />
          </button>
        </FadeIn>

        {project.uxCaseStudy ? (
          <UXCaseStudy project={project} onImageClick={openImageViewer} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 mb-24">
              <div className="space-y-10">
                <FadeIn>
                  <section className="space-y-5">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff4a22] font-semibold">
                      {project.descriptionTitle ||
                        (lang === "en" ? "Project Description" : "Deskripsi")}
                    </h2>
                    <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-200 leading-relaxed text-lg">
                      {getLocalizedText(project.overview)}
                    </p>
                    {project.projectFacts ? (
                      <div className="space-y-3 border-t border-zinc-200/70 pt-5 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800/70 dark:text-zinc-300">
                        <p>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                            Dataset Sumber:
                          </span>{" "}
                          {project.projectFacts.datasetSource}
                        </p>
                        <div>
                          <p>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                              Jumlah Kelas:
                            </span>{" "}
                            {project.projectFacts.classCount}
                          </p>
                          <ol className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 pl-5">
                            {project.projectFacts.classes.map((game) => (
                              <li key={game} className="list-decimal">
                                {game}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <p>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                            Total Data:
                          </span>{" "}
                          {project.projectFacts.totalData}
                        </p>
                        <p>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                            Arsitektur Utama:
                          </span>{" "}
                          {project.projectFacts.architecture}
                        </p>
                      </div>
                    ) : project.overviewDetail ? (
                      <p className="whitespace-pre-line text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {getLocalizedText(project.overviewDetail)}
                      </p>
                    ) : null}
                  </section>
                </FadeIn>
                {(project.outcome || project.projectMetrics) && (
                  <FadeIn>
                    <section className="space-y-4 border-t border-zinc-200/70 pt-7 dark:border-zinc-800/70">
                      <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff4a22] font-semibold">
                        {project.outcomeTitle ||
                          (lang === "en" ? "Results" : "Hasil")}
                      </h2>
                      {project.projectMetrics ? (
                        <>
                          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                            {project.projectMetrics.map((metric) => (
                              <p key={metric.label}>
                                <span className="text-zinc-500 dark:text-zinc-400">
                                  {metric.label}
                                  :
                                </span>{" "}
                                <span className="font-semibold text-zinc-900 dark:text-white">
                                  {metric.value}
                                </span>
                              </p>
                            ))}
                          </div>
                          <h3 className="pt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            Model Formats & Deliverables (Tersimpan dalam ZIP
                            Submission)
                          </h3>
                          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                            {project.projectDeliverables.map((item) => (
                              <li key={item.name}>
                                <code className="break-all font-semibold text-zinc-800 dark:text-zinc-100">
                                  {item.name}
                                </code>
                                {" "}({item.description})
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-200 leading-relaxed text-lg">
                          {getLocalizedText(project.outcome)}
                        </p>
                      )}
                    </section>
                  </FadeIn>
                )}
              </div>

              <div className="space-y-10 lg:border-l lg:border-zinc-200/70 lg:dark:border-zinc-800/70 lg:pl-10">
                {(scopeSections.length > 0 || scopeList.length > 0) && (
                  <FadeIn>
                    <section className="space-y-5">
                      <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff4a22] font-semibold flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        {project.scopeTitle ||
                          t("projectDetail", "responsibilities", lang) ||
                          "Key Responsibilities"}
                      </h2>
                      {scopeSections.length > 0 ? (
                        <div className="space-y-6">
                          {scopeSections.map((section) => (
                            <div key={section.title}>
                              <h3 className="mb-2 text-sm font-semibold leading-relaxed text-zinc-800 dark:text-zinc-100">
                                {section.title}
                              </h3>
                              <ul className="space-y-2.5 border-l border-zinc-200 pl-4 dark:border-zinc-700">
                                {section.items.map((item) => (
                                  <li
                                    key={item}
                                    className="relative text-sm leading-relaxed text-zinc-600 before:absolute before:-left-[1.32rem] before:top-[0.65rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#ff4a22] dark:text-zinc-300"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="flex flex-col gap-4">
                          {scopeList.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#ff4a22] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </FadeIn>
                )}

                {((project.stack && project.stack.length > 0) ||
                  (project.toolGroups && project.toolGroups.length > 0)) && (
                  <FadeIn>
                    <section className="space-y-5 border-t border-zinc-200/70 dark:border-zinc-800/70 pt-7">
                      <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff4a22] font-semibold flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        {project.stackTitle ||
                          (lang === "en" ? "Software & Tools" : "Software & Tools")}
                      </h2>
                      {project.toolGroups ? (
                        <div className="space-y-4">
                          {project.toolGroups.map((group) => (
                            <div key={group.title}>
                              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                {group.title}
                              </h3>
                              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                                {group.items.map((tool) => (
                                  <li key={tool} className="leading-relaxed">
                                    {tool}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="flex flex-wrap gap-x-5 gap-y-3">
                          {project.stack.map((tool) => (
                            <li
                              key={tool}
                              className="text-sm text-zinc-700 dark:text-zinc-300"
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </FadeIn>
                )}

                {(project.game && project.game !== "#") ||
                (project.demo && project.demo !== "#") ||
                (project.repo && project.repo !== "#") ? (
                  <FadeIn>
                    <div className="flex flex-wrap items-center gap-4">
                      {project.repo && project.repo !== "#" && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full border border-[#ff4a22] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#ff4a22] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff4a22] hover:text-white"
                        >
                          <span>{t("projectDetail", "viewCode", lang) || "View Code"}</span>
                          <ExternalLink size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                      {project.game && project.game !== "#" && (
                        <a
                          href={project.game}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full bg-[#ff4a22] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white shadow-md shadow-[#ff4a22]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e03d1a] hover:shadow-lg hover:shadow-[#ff4a22]/35"
                        >
                          <span>Link Game</span>
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      )}
                      {project.demo && project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full border border-[#ff4a22] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#ff4a22] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff4a22] hover:text-white"
                        >
                          <span>Link Demo</span>
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </FadeIn>
                ) : null}
              </div>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <FadeIn>
                <section className="space-y-7 mb-24">
                  <div className="flex items-end justify-between border-b border-zinc-200/70 dark:border-zinc-800/70 pb-4">
                    <h2 className="text-sm font-mono uppercase tracking-widest text-[#ff4a22] font-semibold">
                      {t("projectDetail", "galleryTag", lang) || "Showcase Gallery"}
                    </h2>
                    <span className="text-xs font-mono text-zinc-400">
                      {String(Math.min(project.gallery.length, 8)).padStart(2, "0")}{" "}
                      {t("projectDetail", "imagesWord", lang) || "Images"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-8 md:gap-12">
                    {project.gallery.slice(0, 8).map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          openImageViewer({
                            src: imgUrl,
                            alt: `${project.title} showcase image ${i + 1}`,
                          })
                        }
                        aria-label={
                          lang === "en"
                            ? `View project image ${i + 1}`
                            : `Lihat gambar proyek ${i + 1}`
                        }
                        className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-zinc-100 text-left dark:bg-zinc-900"
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.title} showcase image ${i + 1}`}
                          loading="lazy"
                          onError={handleImageError}
                          className="block h-auto w-full object-contain transition-transform duration-500"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}
          </>
        )}

        {/* Animated Divider */}
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 mb-20 relative overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-[#ff4a22] to-transparent"
            style={{ width: lineWidth }}
          />
        </div>

        {/* Rekomendasi Proyek Terkait */}
        <section>
          <FadeIn className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
              {lang === "en" ? "Related Projects" : "Proyek Terkait"}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map(([key, p], idx) => (
              <FadeIn key={key} delay={idx * 0.1}>
                <Link
                  to={`/projects/${key}`}
                  className="group block transition-colors duration-300"
                >
                  <div className="relative mb-4 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={p.image || "/images/placeholder.webp"}
                      alt={p.title}
                      loading="lazy"
                      onError={handleImageError}
                      className="block h-auto w-full object-contain"
                    />
                    <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold dark:text-white group-hover:text-[#ff4a22] transition-colors flex items-center justify-between">
                    {p.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff4a22]" />
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                    {p.subtitle || p.role}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
        <ProjectImageLightbox
          key={selectedImage?.src || "closed"}
          image={selectedImage}
          lang={lang}
          onClose={closeImageViewer}
        />
      </div>
    </section>
  );
};

export default ProjectDetail;