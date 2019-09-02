using Microsoft.AspNetCore.Razor.TagHelpers;

namespace CardHero.AspNetCore.Mvc.TagHelpers
{
    [HtmlTargetElement(Attributes = "show-if-null")]
    public class ShowifNullTagHelper : TagHelper
    {
        [HtmlAttributeName("show-if-null")]
        public object ShowIfNull { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (ShowIfNull != null)
            {
                output.SuppressOutput();
            }
        }
    }
}
