using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CardHero.NetCoreApp.Mvc.Models
{
    public class SortableViewModel
    {
        public int Page { get; set; } = 0;

        public int PageSize { get; set; } = 10;

        public IEnumerable<SelectListItem> PageSizes { get; set; } = new List<SelectListItem>
        {
            new SelectListItem { Text = "10" },
            new SelectListItem { Text = "25" },
            new SelectListItem { Text = "50" },
            new SelectListItem { Text = "100" }
        };

        public int Total { get; set; }

        public string Sort { get; set; }

        public string SortDir { get; set; }
    }
}
