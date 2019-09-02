using System.ComponentModel.DataAnnotations;
using CardHero.NetCoreApp.Mvc.Models.ChartJs;
using KwokKan.Sortable;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class CardViewModel : ISortable, IChartJs
    {
        private const string GroupMain = "main";
        private const string GroupSecondary = "secondary";

        [Sortable("Default")]
        public int Id { get; set; }

        [Sortable]
        public string Name { get; set; }

        public string Description { get; set; }

        [Display(Name = "Up Attack")]
        [ChartJs(Order = 3, Group = GroupSecondary)]
        [Sortable]
        public int UpAttack { get; set; }

        [Display(Name = "Right Attack")]
        [ChartJs(Order = 4, Group = GroupSecondary)]
        [Sortable]
        public int RightAttack { get; set; }

        [Display(Name = "Down Attack")]
        [ChartJs(Order = 5, Group = GroupSecondary)]
        [Sortable]
        public int DownAttack { get; set; }

        [Display(Name = "Left Attack")]
        [ChartJs(Order = 6, Group = GroupSecondary)]
        [Sortable]
        public int LeftAttack { get; set; }

        [ChartJs(Order = 0, Group = GroupMain)]
        [Sortable]
        public int Health { get; set; }

        [ChartJs(Order = 1, Group = GroupMain)]
        [Sortable]
        public int Attack { get; set; }

        [ChartJs(Order = 2, Group = GroupMain)]
        [Sortable]
        public int Defence { get; set; }

        [Display(Name = "Total Stats")]
        [Sortable]
        public int TotalStats { get; set; }

        [Display(Name = "Is Favourited")]
        public bool IsFavourited { get; set; }
    }
}
