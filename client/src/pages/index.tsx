import NutritionChart from "../components/NutritionChart"

export default function Home() {
  const date = new Date()

  return (
    <div>
      <div className="flex flex-row justify-end">
        <span>{date.toLocaleDateString(undefined, {
                                                    weekday:"long",
                                                    year:"numeric",
                                                    month: "long",
                                                    day:"numeric"
                                                  })}
        </span>
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <span >Today's Nutrition Distribution</span>
        <NutritionChart className="h-48 mt-1"
                        data={{
                          labels: ['Protein', 'Fats', 'Carbs'],
                          datasets: [
                              {
                                  label: '# of Votes',
                                  data: [12, 19, 3],
                                  backgroundColor: [
                                      'rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                  ],
                                  borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                  ],
                                  borderWidth: 1
                              }
                          ]
                      }}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true
                          },
                          tooltips: {
                            enabled: false
                          }
                        }
                    }} />
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <span >Today's Dishes</span>
      </div>
    </div>)
}
