using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.NetCoreApp.Mvc.ViewComponents
{
    public class MenuViewComponent : ViewComponent
    {
        public Task<IViewComponentResult> InvokeAsync()
        {
            var model = new MenuViewComponentModel
            {
            };

            return Task.FromResult<IViewComponentResult>(View(model));
        }
    }
}
