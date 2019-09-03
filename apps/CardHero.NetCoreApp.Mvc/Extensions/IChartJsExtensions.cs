using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace CardHero.NetCoreApp.Mvc.Models.ChartJs
{
    public static class IChartJsExtensions
    {
        public static IEnumerable<string> GetLabels(this IChartJs chart, string group = null)
        {
            if (chart == null)
            {
                return null;
            }

            var labels = chart.GetType().GetProperties()
                        .Where(x => x.GetCustomAttributes<ChartJsAttribute>().Any(a => string.IsNullOrWhiteSpace(group) || a.Group == group))
                        .Select(x =>
                        {
                            var ca = x.GetCustomAttribute<ChartJsAttribute>();
                            var da = x.GetCustomAttribute<DisplayAttribute>()?.Name;

                            return new
                            {
                                Value = da ?? ca.Label ?? x.Name,
                                Order = ca.Order,
                            };
                        })
                        .OrderBy(x => x.Order)
                        .Select(x => x.Value)
                        .ToList();

            return labels;
        }

        public static IEnumerable<object> GetData(this IChartJs chart, string group = null)
        {
            if (chart == null)
            {
                return null;
            }

            var labels = chart.GetType().GetProperties()
                        .Where(x => x.GetCustomAttributes<ChartJsAttribute>().Any(a => string.IsNullOrWhiteSpace(group) || a.Group == group))
                        .Select(x =>
                        {
                            var ca = x.GetCustomAttribute<ChartJsAttribute>();

                            return new
                            {
                                Value = x.GetValue(chart, null),
                                Order = ca.Order,
                            };
                        })
                        .OrderBy(x => x.Order)
                        .Select(x => x.Value)
                        .ToList();

            return labels;
        }
    }
}
