using System.Collections.Generic;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class SearchCardViewModel
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public string Name { get; set; }

        public string Sort { get; set; }

        public string SortDir { get; set; }

        public IEnumerable<CardViewModel> Cards { get; set; }
    }
}
