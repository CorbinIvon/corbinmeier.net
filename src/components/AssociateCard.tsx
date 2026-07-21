type Associate = {
  id?: string;
  name: string;
  logo: string;
  role?: string;
  link?: string;
  description?: string;
};

export default function AssociateCard({ associate }: { associate: Associate }) {
  return (
    <a
      href={associate.link}
      className="group block p-3 border rounded-lg flex items-center gap-3"
    >
      <div className="w-12 h-12 relative flex-shrink-0">
        <img
          src={associate.logo}
          alt={associate.name}
          className="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div>
        <div className="font-semibold">{associate.name}</div>
        <div className="text-sm text-muted-foreground">{associate.role}</div>
      </div>
    </a>
  );
}
