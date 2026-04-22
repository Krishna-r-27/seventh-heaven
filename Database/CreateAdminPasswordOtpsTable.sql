-- SQL Server compatible table for admin password OTPs
-- Creates table only if it does not already exist.

IF OBJECT_ID(N'dbo.AdminPasswordOtps', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.AdminPasswordOtps (
        Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        Email NVARCHAR(255) NOT NULL,
        OtpHash NVARCHAR(512) NOT NULL,
        ExpiresAtUtc DATETIME2 NOT NULL,
        CreatedAtUtc DATETIME2 NOT NULL DEFAULT (SYSUTCDATETIME()),
        Attempts INT NOT NULL DEFAULT (0),
        IsUsed BIT NOT NULL DEFAULT (0)
    );

    CREATE INDEX IX_AdminPasswordOtps_Email ON dbo.AdminPasswordOtps (Email);
    CREATE INDEX IX_AdminPasswordOtps_ExpiresAtUtc ON dbo.AdminPasswordOtps (ExpiresAtUtc);
END;