using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Options;

namespace CardHero.AspNetCore.Mvc.TagHelpers
{
    [HtmlTargetElement("link", Attributes = UseAssetAttributeName + "," + HrefAttributeName)]
	[HtmlTargetElement("img", Attributes = UseAssetAttributeName + "," + SrcAttributeName)]
	[HtmlTargetElement("script", Attributes = UseAssetAttributeName + "," + SrcAttributeName)]
	public class AssetTagHelper : TagHelper
	{
		private const string UseAssetAttributeName = "tt-use-asset";
		private const string SrcAttributeName = "src";
		private const string HrefAttributeName = "href";

		private readonly AssetTagHelperOptions _options;

		[HtmlAttributeName(UseAssetAttributeName)]
		public bool UseAsset { get; set; }

		[HtmlAttributeName(SrcAttributeName)]
		public string Src { get; set; }

		[HtmlAttributeName(HrefAttributeName)]
		public string Href { get; set; }

		public AssetTagHelper(IOptions<AssetTagHelperOptions> options)
		{
			_options = options.Value;
		}

		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			if (UseAsset)
			{
				if (!string.IsNullOrEmpty(Src))
				{
					if (Src.StartsWith("~/"))
					{
						Src = _options.BaseUrl + Src.Substring(2);
					}

					output.Attributes.SetAttribute(SrcAttributeName, Src);
				}
				else if (!string.IsNullOrEmpty(Href))
				{
					if (Href.StartsWith("~/"))
					{
						Href = _options.BaseUrl + Href.Substring(2);
					}

					output.Attributes.SetAttribute(HrefAttributeName, Href);
				}
			}
		}
	}
}
