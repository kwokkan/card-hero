using Microsoft.AspNetCore.Razor.TagHelpers;

namespace CardHero.AspNetCore.Mvc.TagHelpers
{
    [HtmlTargetElement(Attributes = "show-if")]
    public class ShowIfTagHelper : TagHelper
    {
        [HtmlAttributeName("show-if")]
        public bool ShowIf { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (ShowIf == false)
            {
                output.SuppressOutput();
            }
        }
    }
}
