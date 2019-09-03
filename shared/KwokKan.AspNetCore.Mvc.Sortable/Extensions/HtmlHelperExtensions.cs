using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using KwokKan.Sortable;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace KwokKan.AspNetCore.Mvc.Sortable
{
    public static class HtmlHelperExtensions
    {
        /// <summary>
        /// Creates a dropdown list from a model.
        /// </summary>
        /// <typeparam name="TModel">The current viewmodel.</typeparam>
        /// <param name="htmlHelper">The HtmlHelper.</param>
        /// <param name="model">The model to use.</param>
        /// <param name="name">Name of the dropdown.</param>
        /// <param name="optionLabel">Text for the empty value.</param>
        /// <param name="htmlAttributes">Html attributes.</param>
        /// <param name="selectedValue">The currently selected value.</param>
        /// <returns>The dropdown list html.</returns>
        public static IHtmlContent SortableDropDownList<TModel>(
            this IHtmlHelper<TModel> htmlHelper,
            Type model,
            string name = Constants.SortName,
            string optionLabel = "N/A",
            object htmlAttributes = null,
            string selectedValue = null
        )
        {
            if (model != null)
            {
                if (model.GetInterfaces().Contains(typeof(ISortable)))
                {
                    var selectList = model.GetProperties()
                        .Where(x => x.GetCustomAttributes<SortableAttribute>().Any())
                        .Select(x =>
                        {
                            var sa = x.GetCustomAttribute<SortableAttribute>();
                            var da = x.GetCustomAttribute<DisplayAttribute>()?.Name;

                            return new
                            {
                                Name = da ?? sa.Name ?? x.Name,
                                Value = x.Name,
                                Order = sa.Order,
                            };
                        })
                        .OrderBy(x => x.Order)
                        .ThenBy(x => x.Name)
                        .Select(x =>
                        {
                            return new SelectListItem
                            {
                                Text = x.Name,
                                Value = x.Value,
                                Selected = x.Value == selectedValue,
                            };
                        });

                    return htmlHelper.DropDownList(name, selectList, optionLabel, htmlAttributes);
                }
            }

            return null;
        }

        /// <summary>
        /// Creates a dropdown list for sortable order.
        /// </summary>
        /// <typeparam name="TModel">The current model.</typeparam>
        /// <param name="htmlHelper">The HtmlHelper.</param>
        /// <param name="name">Name of the dropdown.</param>
        /// <param name="optionLabel">Text for the empty value.</param>
        /// <param name="htmlAttributes">Html attributes.</param>
        /// <param name="selectedValue">The currently selected value.</param>
        /// <returns>The dropdown list html.</returns>
        public static IHtmlContent SortableDirectionDropDownList<TModel>(
            this IHtmlHelper<TModel> htmlHelper,
            string name = Constants.SortDirectionName,
            string optionLabel = "N/A",
            object htmlAttributes = null,
            string selectedValue = null
        )
        {
            var selectList = Enum.GetNames(typeof(SortDirection))
                .Select(x => new SelectListItem
                {
                    Text = x,
                    Value = x,
                    Selected = x == selectedValue,
                });

            return htmlHelper.DropDownList(name, selectList, optionLabel, htmlAttributes);
        }
    }
}
