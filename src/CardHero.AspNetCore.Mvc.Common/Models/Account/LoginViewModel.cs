using System.ComponentModel.DataAnnotations;

namespace CardHero.AspNetCore.Mvc.Common.Models
{
    public class LoginViewModel
    {
		[Required]
		public string Username { get; set; }

		[Required]
		public string Password { get; set; }

		public string ReturnUrl { get; set; }
	}
}
