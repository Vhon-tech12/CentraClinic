import Link from "next/link";
import Image from "next/image";


const Endorse = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Getting Care Has Never <br className="hidden sm:block" /> Been Easier
        </motion.h2>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Our streamlined process makes healthcare accessible in just three simple steps
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <StepCard
            icon={<Smile className="h-8 w-8" />}
            title="Mental Health"
            description="Private therapy and test help from licensed professionals"
          />
          <StepCard
            icon={<Calendar className="h-8 w-8" />}
            title="Book Instantly"
            description="Schedule your appointment via our web app"
          />
          <StepCard
            icon={<PenTool className="h-8 w-8" />}
            title="Consult & Follow Up"
            description="Get treatment, advice, prescription — all in one place"
          />
        </div>

        <div className="mt-12">
          <Button size="lg" className="rounded-full px-8">
            Start Now
          </Button>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full rounded-2xl border-none shadow-sm">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Endorse;
