using System.Collections.Generic;

namespace CardHero.NetCoreApp.Mvc.Models.ChartJs
{
    public class DatasetViewModel
    {
        public string Label { get; set; }

        public string BackgroundColor { get; set; }

        public string BorderColor { get; set; }

        public string PointBorderColor { get; set; }

        public string PointHoverBackgroundColor { get; set; }

        public string PointHoverBorderColor { get; set; }

        public IEnumerable<object> Data { get; set; }
    }
}
