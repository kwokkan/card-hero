using System.Threading.Tasks;
using CardHero.AspNetCore.Mvc.Common.Models.Components;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.ViewComponents
{
    public class MenuViewComponent : ViewComponent
	{
		public Task<IViewComponentResult> InvokeAsync()
		{
			var model = new MenuViewComponentModel
			{
				FullName = User.Identity.Name
			};

			return Task.FromResult<IViewComponentResult>(View(model));
		}
	}
}
