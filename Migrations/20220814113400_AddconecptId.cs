using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace REACT.Migrations
{
    public partial class AddconecptId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "conceptId",
                table: "Consults",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "conceptId",
                table: "Consults");
        }
    }
}
