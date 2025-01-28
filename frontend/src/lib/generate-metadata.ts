import type { Metadata } from "next";

const generateMetadata = (metadata?: Metadata) => {
  const title = metadata?.title ?? "Jadwal Seminar";
  const generatedTitle = title ?? "- Jadwal Seminar STMIK Widya Cipta Dharma";
  return {
    title: generatedTitle,
    description:
      metadata?.description ??
      "Jadwal Seminar STMIK Widya Cipta Dharma adalah aplikasi yang menyediakan informasi jadwal seminar mahasiswa STMIK Widya Cipta Dharma.",
    icons: metadata?.icons ?? [{ rel: "icon", url: "/favicon.ico" }],
  };
};

export default generateMetadata;
