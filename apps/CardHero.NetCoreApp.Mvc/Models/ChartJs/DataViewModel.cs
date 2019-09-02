using System.Collections.Generic;

namespace CardHero.NetCoreApp.Mvc.Models.ChartJs
{
    public class DataViewModel
    {
        public IEnumerable<string> Labels { get; set; }

        public List<DatasetViewModel> Datasets { get; set; }
    }
}
