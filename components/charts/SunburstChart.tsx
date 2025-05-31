import { ComputedDatum, MouseHandler, ResponsiveSunburst } from "@nivo/sunburst";
import useSunburstData, { ItemData } from "./hooks/useSunburstData";
import { BasicTooltip } from "@nivo/tooltip";
import { Button } from "@mui/material";

function findNode(
  children: ItemData[],
  clickedData: ComputedDatum<ItemData>,
): ItemData | undefined {
  for (const c of children) {
    if (c.id === clickedData.id) {
      return c;
    } else if (typeof clickedData.id === "string" && clickedData.id.startsWith(c.id)) {
      return findNode(c.children, clickedData);
    } else if (c.children) {
      const found = findNode(c.children, clickedData);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

const SunburstTooltip = ({
  id,
  color,
  data: { value },
  formattedValue,
}: ComputedDatum<ItemData>) => {
  return <BasicTooltip id={`${id} (${value})`} value={formattedValue} enableChip color={color} />;
};

const margin = { top: 2, right: 2, bottom: 2, left: 2 };

export default function SunburstChart() {
  const initialData = useSunburstData();
  const [data, setData] = useState<ItemData>(initialData);
  const [canReset, setCanReset] = useState(false);

  const resetChart = () => {
    setCanReset(false);
    setData(initialData);
  };
  const onClick: MouseHandler<ItemData> = (clickedData) => {
    const foundObject = findNode(initialData.children, clickedData);
    if (foundObject && foundObject.children) {
      setData(foundObject);
      setCanReset(true);
    }
  };

  return (
    <>
      <div className="absolute z-1 flex">
        <Button size="small" className="px-4" onClick={resetChart} disabled={!canReset}>
          Reset Chart
        </Button>
      </div>
      <ResponsiveSunburst<ItemData>
        margin={margin}
        data={data}
        cornerRadius={4}
        borderWidth={2}
        borderColor={{ theme: "background" }}
        colors={{ scheme: "dark2" }}
        tooltip={SunburstTooltip}
        onClick={onClick}
      />
    </>
  );
}
