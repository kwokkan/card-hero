using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CardHero.Core.SqlServer.EntityFramework
{
    internal static class ModelBuilderExtensions
    {
        private static List<Type> ForeignKeyTypes { get; } = new List<Type> { typeof(int), typeof(int?) };

        /// <summary>
        /// Use the Triple Triad convention.
        /// </summary
        /// <param name="builder">The ModelBuilder.</param>
        /// <returns>The <paramref name="builder"/>.</returns>
        internal static ModelBuilder UseCardHeroConvention(this ModelBuilder builder)
        {
            Action<EntityTypeBuilder> action = (buildAction) =>
            {
                foreach (var property in buildAction.Metadata.GetProperties().Where(x => ForeignKeyTypes.Contains(x.ClrType)).ToList())
                {
                    var propName = property.Name;
                    var propertyBuilder = buildAction.Property(property.ClrType, propName);

                    if (propName == "Id")
                    {
                        buildAction.HasKey(propName);
                        propertyBuilder.HasColumnName($"{buildAction.Metadata.ClrType.Name}_PK");
                    }
                    else if (propName.EndsWith("Id"))
                    {
                        propertyBuilder.HasColumnName($"{propName.Substring(0, propName.Length - 2)}_FK");

                        if (Nullable.GetUnderlyingType(property.ClrType) != null)
                        {
                            propertyBuilder.IsRequired(required: false);
                        }
                    }
                }
            };

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                builder.Entity(entity.Name, action);
            }

            return builder;
        }
    }
}
