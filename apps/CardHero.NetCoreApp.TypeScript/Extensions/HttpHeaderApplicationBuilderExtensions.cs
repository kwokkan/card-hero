namespace Microsoft.AspNetCore.Builder
{
    public static class HttpHeaderApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCardHeroHttpHeaders(this IApplicationBuilder app, bool allowInline = false)
        {
            app.UseSecurityHeaders(policy =>
            {
                policy
                    .AddContentSecurityPolicy(x =>
                    {
                        x.AddDefaultSrc().None();

                        x.AddConnectSrc().Self();

                        var imgBuilder = x.AddImgSrc().Self();

                        var scriptBuilder = x.AddScriptSrc().Self();

                        var styleBuilder = x.AddStyleSrc().Self();

                        // for dodgy Swagger CSP
                        // https://github.com/swagger-api/swagger-ui/issues/3370
                        if (allowInline)
                        {
                            imgBuilder.Data();
                            scriptBuilder.UnsafeInline();
                            styleBuilder.UnsafeInline();
                        }
                    })
                    .AddFeaturePolicy(x =>
                    {
                        x.AddAccelerometer().None();

                        x.AddAmbientLightSensor().None();

                        x.AddAutoplay().None();

                        x.AddCamera().None();

                        x.AddEncryptedMedia().None();

                        x.AddFullscreen().None();

                        x.AddGeolocation().None();

                        x.AddGyroscope().None();

                        x.AddMagnetometer().None();

                        x.AddMicrophone().None();

                        x.AddMidi().None();

                        x.AddPayment().None();

                        x.AddPictureInPicture().None();

                        x.AddSpeaker().None();

                        x.AddSyncXHR().None();

                        x.AddUsb().None();

                        x.AddVR().None();
                    })
                    .AddFrameOptionsDeny()
                    .AddReferrerPolicySameOrigin()
                    .RemoveServerHeader()
                ;
            });

            return app;
        }
    }
}
