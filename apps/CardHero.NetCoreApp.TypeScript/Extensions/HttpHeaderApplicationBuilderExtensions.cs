namespace Microsoft.AspNetCore.Builder
{
    public static class HttpHeaderApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCardHeroHttpHeaders(this IApplicationBuilder app)
        {
            app.UseSecurityHeaders(policy =>
            {
                policy
                    .AddContentSecurityPolicy(x =>
                    {
                        x.AddDefaultSrc().None();

                        x.AddConnectSrc().Self();

                        x.AddImgSrc().Self();

                        x.AddScriptSrc()
                            .Self()
                            .From("https://cdnjs.cloudflare.com")
                            .WithHashTagHelper();

                        x.AddStyleSrc()
                            .Self()
                            .From("https://cdnjs.cloudflare.com")
                            .WithHashTagHelper();
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
