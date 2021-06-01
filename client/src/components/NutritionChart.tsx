import { Doughnut } from "react-chartjs-2"

type NutritionChartProps = {
    className: string,
    data: Chart.ChartData,
    options: Chart.ChartOptions
}

const NutritionChart: React.FC<NutritionChartProps> = (prop: NutritionChartProps) => {    
    return (
        <div className={prop.className}>
            <Doughnut
                type={'doughnut'}
                data={prop.data} 
                height={400}
                width={600}
                options={prop.options}
            />
        </div>
    )
}

export default NutritionChart