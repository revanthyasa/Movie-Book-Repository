using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace demoproject.API.Migrations
{
    /// <inheritdoc />
    public partial class dataseeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "Id", "Genre", "Name", "Year" },
                values: new object[,]
                {
                    { new Guid("15540e09-92f9-4349-a73e-72e1def78e6d"), "Action/Comedy", "Arya2", 2024 },
                    { new Guid("f9a52b9e-685f-4521-9c5e-c2313b1992b8"), "Action · Comedy · Drama · Romance", "Happy", 2006 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: new Guid("15540e09-92f9-4349-a73e-72e1def78e6d"));

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: new Guid("f9a52b9e-685f-4521-9c5e-c2313b1992b8"));
        }
    }
}
