import { ImportSpreadSheetCard } from "./containers/ImportSpreadSheetCard";
import Background from "./components/Background";
import { WizardCard } from "./containers/WizardCard";
import { PreviewTableCard } from "./containers/PreviewTableCard";
import { WriteEmailCard } from "./containers/WriteEmailCard";
import { SummaryCard } from "./containers/SummaryCard";
import { SuccessCard } from "./containers/SuccessCard";
import { Step, useAppStore } from "./hooks/use-app-store";
import { fill } from "./utils";

function App() {
  const type = useAppStore((state) => state.type);

  const renderComponent = (step: Step) => {
    switch (step) {
      case Step.ImportSpreadSheet:
        return <ImportSpreadSheetCard />;
      case Step.PreviewSpreadSheet:
        return <PreviewTableCard />;
      case Step.WriteEmail:
        return <WriteEmailCard />;
      case Step.Confirmation:
        return <SummaryCard />;
      case Step.Success:
        return <SuccessCard />;
      default:
        return null;
    }
  };

  return (
    <>
      <Background className="w-full h-full"></Background>
      <div className="App relative flex justify-center items-center">
        <WizardCard className="w-full max-w-[974px]">
          {renderComponent(type)}
        </WizardCard>
      </div>
    </>
  );
}

export default App;
