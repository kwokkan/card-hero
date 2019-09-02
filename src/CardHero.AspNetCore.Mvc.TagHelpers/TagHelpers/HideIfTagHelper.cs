using Microsoft.AspNetCore.Razor.TagHelpers;

namespace CardHero.AspNetCore.Mvc.TagHelpers
{
    [HtmlTargetElement(Attributes = "hide-if")]
    public class HideIfTagHelper : TagHelper
    {
        [HtmlAttributeName("hide-if")]
        public bool HideIf { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (HideIf)
            {
                output.SuppressOutput();
            }
        }
    }
}
