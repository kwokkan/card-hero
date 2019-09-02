using Microsoft.AspNetCore.Razor.TagHelpers;

namespace CardHero.AspNetCore.Mvc.TagHelpers
{
    [HtmlTargetElement(Attributes = "hide-if-null")]
    public class HideIfNullTagHelper : TagHelper
    {
        [HtmlAttributeName("hide-if-null")]
        public object HideIfNull { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (HideIfNull == null)
            {
                output.SuppressOutput();
            }
        }
    }
}
