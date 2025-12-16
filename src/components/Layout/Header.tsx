import type { SettingsDocument } from "@root/prismicio-types";

const Header = ({ settings }: { settings: SettingsDocument }) => {
  const links = settings.data.navigation;

  return (
    <header className="flex justify-between">
      logo
      <div className="max-w-[50vw]">{JSON.stringify(links)}</div>
    </header>
  );
};

export default Header;
