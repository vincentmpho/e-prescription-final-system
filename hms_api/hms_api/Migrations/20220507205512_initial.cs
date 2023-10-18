using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace hms_api.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Doctor",
                columns: table => new
                {
                    DoctorNumber = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    DoctorName = table.Column<string>(type: "nvarchar(125)", nullable: true),
                    DoctorSurname = table.Column<string>(type: "nvarchar(125)", nullable: true),
                    DoctorContact = table.Column<string>(type: "nvarchar(125)", nullable: true),
                    DoctorEmail = table.Column<string>(type: "nvarchar(125)", nullable: true),
                    DoctorQualification = table.Column<string>(type: "nvarchar(150)", nullable: true),
                    DoctorPracticeNumber = table.Column<int>(nullable: false),
                    DoctorHCRN = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctor", x => x.DoctorNumber);
                });

            migrationBuilder.CreateTable(
                name: "MedicalPractice",
                columns: table => new
                {
                    PracticeNumber = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(150)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalPractice", x => x.PracticeNumber);
                });

            migrationBuilder.CreateTable(
                name: "Medication",
                columns: table => new
                {
                    MedicationNumber = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    Dosage = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ActiveEngredients = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Strengths = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Schedule = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    ContraIndicationR = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medication", x => x.MedicationNumber);
                });

            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    PatientNumber = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    PatientName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PatientSurname = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PatientAddress = table.Column<string>(type: "nvarchar(150)", nullable: true),
                    PatientContact = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    PatientEmail = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PatientDOB = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.PatientNumber);
                });

            migrationBuilder.CreateTable(
                name: "Phamacy",
                columns: table => new
                {
                    PhamacyNumber = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    PhamacyName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacyContact = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    PhamacyEmail = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacyLicenceNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phamacy", x => x.PhamacyNumber);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    email = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    type = table.Column<string>(type: "nvarchar(15)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "FirstVisit",
                columns: table => new
                {
                    VisitId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChronicHistory = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    DoctorNumber = table.Column<string>(nullable: true),
                    DoctorNumber1 = table.Column<string>(nullable: true),
                    CurrentChronicMedication = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    KnownAllegies = table.Column<string>(type: "nvarchar(255)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FirstVisit", x => x.VisitId);
                    table.ForeignKey(
                        name: "FK_FirstVisit_Doctor_DoctorNumber1",
                        column: x => x.DoctorNumber1,
                        principalTable: "Doctor",
                        principalColumn: "DoctorNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Prescription",
                columns: table => new
                {
                    PrescriptionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrescriptionDate = table.Column<DateTime>(nullable: false),
                    MedicationNumber = table.Column<string>(nullable: true),
                    MedicationNumber1 = table.Column<string>(nullable: true),
                    Quantity = table.Column<double>(nullable: false),
                    Instructions = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Repetition = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Filled = table.Column<bool>(nullable: false),
                    PatientNumber = table.Column<string>(nullable: true),
                    PatientNumber1 = table.Column<string>(nullable: true),
                    DoctorName = table.Column<string>(nullable: true),
                    DoctorNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescription", x => x.PrescriptionId);
                    table.ForeignKey(
                        name: "FK_Prescription_Doctor_DoctorNumber",
                        column: x => x.DoctorNumber,
                        principalTable: "Doctor",
                        principalColumn: "DoctorNumber",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prescription_Medication_MedicationNumber1",
                        column: x => x.MedicationNumber1,
                        principalTable: "Medication",
                        principalColumn: "MedicationNumber",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prescription_Patient_PatientNumber1",
                        column: x => x.PatientNumber1,
                        principalTable: "Patient",
                        principalColumn: "PatientNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Phamacist",
                columns: table => new
                {
                    PhamacistNumber = table.Column<string>(type: "nvarchar(15)", nullable: false),
                    PhamacistName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacistSurname = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacistContact = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacistEmail = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacistRegistrationNumber = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PhamacyNumber = table.Column<string>(nullable: true),
                    PhamacyNumber1 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phamacist", x => x.PhamacistNumber);
                    table.ForeignKey(
                        name: "FK_Phamacist_Phamacy_PhamacyNumber1",
                        column: x => x.PhamacyNumber1,
                        principalTable: "Phamacy",
                        principalColumn: "PhamacyNumber",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FirstVisit_DoctorNumber1",
                table: "FirstVisit",
                column: "DoctorNumber1");

            migrationBuilder.CreateIndex(
                name: "IX_Phamacist_PhamacyNumber1",
                table: "Phamacist",
                column: "PhamacyNumber1");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_DoctorNumber",
                table: "Prescription",
                column: "DoctorNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_MedicationNumber1",
                table: "Prescription",
                column: "MedicationNumber1");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PatientNumber1",
                table: "Prescription",
                column: "PatientNumber1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FirstVisit");

            migrationBuilder.DropTable(
                name: "MedicalPractice");

            migrationBuilder.DropTable(
                name: "Phamacist");

            migrationBuilder.DropTable(
                name: "Prescription");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Phamacy");

            migrationBuilder.DropTable(
                name: "Doctor");

            migrationBuilder.DropTable(
                name: "Medication");

            migrationBuilder.DropTable(
                name: "Patient");
        }
    }
}
