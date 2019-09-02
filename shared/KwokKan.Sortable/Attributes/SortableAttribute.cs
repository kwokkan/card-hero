using System;

namespace KwokKan.Sortable
{
    public class SortableAttribute : Attribute
    {
		public string Name { get; set; }

		public int Order { get; set; }

        public SortableAttribute()
        {
        }

        public SortableAttribute(string name)
        {
            Name = name;
        }

        public SortableAttribute(string name, int order)
        {
            Name = name;
            Order = order;
        }
    }
}
