using System;

namespace CardHero.NetCoreApp.Mvc.Models.ChartJs
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class ChartJsAttribute : Attribute
    {
        public string Label { get; set; }

        public int Order { get; set; }

        public string Group { get; set; }
    }
}
